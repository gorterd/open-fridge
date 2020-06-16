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

      this.results = this.results.and(conditions);
    }
    return this;
  }

  complete() {
    return this.results;
  }

  _weightIngredients(ingredients){

  }
}

module.exports = FilterResults;