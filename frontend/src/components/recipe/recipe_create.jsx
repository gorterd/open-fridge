import React from 'react';
import './recipe_create.css';

class RecipeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      servings: "",
      ingredients: {},   //{ input-0 : "1 large peeled potato" },
      instructions: "",
      image: "", 
      inputs: [
        "input-0",
        "input-1",
        "input-2",
        "input-3",
        "input-4",
        "input-5",
      ],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  //////////ADD IMAGE!!!!

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    this.props.createRecipe(this.state);
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  updateIngredient(key) {
    return (e) => {
        const update = Object.assign({}, this.state.ingredients, {[key]:e.currentTarget.value})
        this.setState({ ingredients: update })
    }
  }

  addInput() {
    const newInput = `input-${this.state.inputs.length}`;

    return (e) => {
      this.setState((prevState) => ({
        inputs: prevState.inputs.concat([newInput]),
      }));
      // this.state.inputs[this.state.inputs.length-1].select()
    };
  }


  render() {
    return (
      <div className="recipe-create-div">
        <div className="recipe-create-div-wrap">
          <form onSubmit={this.addInput()} className="ingredient-outer-form">
            <div className="recipe-ingredients-div">
              <label className="recipe-ingredients">
                Ingredients:
                <button id="add-ingredient-btn">+</button>
                {this.state.inputs.map((input, idx) => (
                  <input
                    key={input}
                    type="text"
                    onChange={this.updateIngredient(input)}
                    className={`ingredient-num-${idx}`}
                  />
                ))}
              </label>
            </div>
          </form>

          <form onSubmit={this.handleSubmit}>
            <div className="recipe-not-ingredients">
              <h1>Recipe</h1>
              <label htmlFor="recipe-name" className="recipe-name">
                Recipe Name:
                <input
                  type="text"
                  id="recipe-name"
                  onChange={this.update("name")}
                />
              </label>

              <label htmlFor="recipe-servings" className="recipe-servings">
                Serving Size:
                <input
                  type="text"
                  id="recipe-servings"
                  onChange={this.update("servings")}
                />
              </label>

              <label htmlFor="recipe-directions" className="recipe-directions">
                Directions:
                <textarea id="recipe-directions" cols="30" rows="10" onChange={this.update("instructions")}/>
              </label>

              <button>Chef</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RecipeCreate;