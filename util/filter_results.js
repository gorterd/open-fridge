class FilterResults {
  constructor(results){
    this.results = results;
  }

  // to search by ingredient(s), use comma separated list of ingredients with key `ingredients`
  // eg. ingredients=ingredient1,ingredient2,ingredient3
  byIngredients(ingredientsList) {
    if (ingredientsList) {
      let ingredients = ingredientsList.split(',');

      let conditions = ingredients
        .map(ing => {
          return { 'ingredients.name': { $regex: new RegExp(ing, 'i') } };
        });

      this.results.match({$and: conditions});
      this._weightIngredients(ingredients);
    }
    return this;
  }

  complete() {
    return this.results;
  }

  _weightIngredients(ingredients){
    this.results.addFields({
      ingredientsWeight: 0
    });

    ingredients.forEach(ing => {
      this.results.addFields({
        ingredientsWeight: { $add: [ 
          "$ingredientsWeight", 

          // add 1 weighting point if the name of the dish includes the 
          // name of the ingredient
          {
            $cond: {
              if: {
                $regexMatch: {
                  input: "$name",
                  regex: new RegExp(ing, "i")
                }
              },
              then: 1,
              else: 0
            }
          },
          
          // add 1 weighting point if the searched ingredient appears 
          // at the end of the ingredient.name string
          // e.g. 'apple juice' gets 0 points
          //      'large apple' gets 1 point
          {
            $min: [
              {
                $size: {
                  $filter: {
                    input: "$ingredients",
                    as: "ing",
                    cond: {
                      $regexMatch: {
                        input: "$$ing.name",
                        regex: new RegExp(`\\b${ing}s?$`, "i")
                      }
                    }
                  }
                }
              },
              1
            ]
          }

        ]}
      })
    });

    //sort by ingredients weighting, desc, and remove the field for weighting
    this.results
      .sort({ingredientsWeight: -1})
      .append({ $unset: "ingredientsWeight" });

    return this;
  }
}

module.exports = FilterResults;