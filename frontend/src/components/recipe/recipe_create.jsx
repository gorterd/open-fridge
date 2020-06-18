import React from 'react';
import './recipe_create.css'

class RecipeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      servings: "",
      ingredients: [],
      instructions: "",
      inputs: ["input-0"],
      test: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("handleSubmit"); // this.props.generateRecipe(); //////////
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  addInput() {
    console.log("add input");
    const newInput = `input-${this.state.inputs.length}`;

    return (e) => {
      this.setState((prevState) => ({
        inputs: prevState.inputs.concat([newInput]),
      }));
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
                <div className="ingredient-input-div">
                  {this.state.inputs.map((input, idx) => (
                    <input
                      key={input}
                      type="text"
                      onChange={this.update("test")}
                      className={`ingredient-num-${idx}`}
                    />
                  ))}
                </div>
              </label>
              <button>Add</button>
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
                <textarea id="recipe-directions" cols="30" rows="10" />
              </label>

              <button>Chef</button>
              {/* </div> */}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RecipeCreate;