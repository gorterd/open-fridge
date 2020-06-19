import React from 'react';
import { Link } from 'react-router-dom';
import './recipe_create.css';
import storage from './create-storage.jpg'

class RecipeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      servings: "",
      ingredients: [],
      instructions: [],
      image: "",
      time: "",
      inputs: [
        "input-0",
        "input-1",
        "input-2",
        "input-3",
        "input-4",
        "input-5",
        "input-6",
        "input-7",
        "input-8",
        "input-9",
        "input-10",
        "input-11",
        "input-12",
      ],
      ingredientString: {},
      errors: this.props.errors,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    this.props.createRecipe(this.state);
  }

  update(field) {
    return (e) => {
      if (field === 'instructions') {
        let instruct = e.currentTarget.value.split(/\r?\n/)
        this.setState({instructions: instruct})
      } else {
        this.setState({ [field]: e.currentTarget.value });
      }
    };
  }

  updateIngredient(key) {
    return (e) => {
        const update = Object.assign({}, this.state.ingredientString, {[key]:e.currentTarget.value})
        this.setState({ ingredientString: update })
        this.setState({ ingredients: Object.values(this.state.ingredientString) });
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
    let errors = this.props.errors;
    let ingErrors = null;
    let ingErrorsCN = "";
    let instructErrors = null;
    let instructErrorsCN = "";
    let nameErrors = null;
    let nameErrorsCN = "";
    let servingErrors = null;
    let servingErrorsCN = "";
    if (errors) {
      if (errors.ingredients) {
        ingErrors = errors.ingredients;
        ingErrorsCN = "ingredientErrors";
      }
      if (errors.instructions) {
        instructErrors = errors.instructions;
        instructErrorsCN = "instructionErrors";
      }
      if (errors.name) {
        nameErrors = errors.name;
        nameErrorsCN = "nameErrors";
      }
      if (errors.servings) {
        servingErrors = errors.servings;
        servingErrorsCN = "servingsErrors";
      }
    }

    return (
      <>
        <Link className="session-logo" to="/"></Link>

        <div className="recipe-create-div">
          <img
            src={storage}
            alt="openFridge"
            draggable="false"
            className="recipe-create-image"
          />

          <div className="recipe-create-div-wrap">
            <div className="recipe-create-right">
              <form
                onSubmit={this.addInput()}
                className="ingredient-outer-form"
              >
                <div className="recipe-ingredients-div">
                  <div className={`${ingErrorsCN}-create`}>{ingErrors}</div>
                  <label className={`recipe-ingredients ${ingErrorsCN}`}>
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

              <label htmlFor="recipe-time" className="recipe-time">
                Time to Cook:
                <input
                  type="text"
                  id="recipe-time"
                  onChange={this.update("time")}
                />
              </label>

              <label htmlFor="recipe-image" className="recipe-image">
                Link to image:
                <input
                  type="text"
                  id="recipe-image"
                  onChange={this.update("image")}
                />
              </label>
            </div>

            <div className="recipe-create-left">
              <form onSubmit={this.handleSubmit}>
                <div className="recipe-not-ingredients">
                  <h1>Recipe</h1>
                  <div className={`${nameErrorsCN}-create`}>{nameErrors}</div>
                  <label
                    htmlFor="recipe-name"
                    className={`recipe-name ${nameErrorsCN}`}
                  >
                    Recipe Name:
                    <input
                      type="text"
                      id="recipe-name"
                      onChange={this.update("name")}
                    />
                  </label>

                  <div className={`${servingErrorsCN}-create`}>
                    {servingErrors}
                  </div>
                  <label
                    htmlFor="recipe-servings"
                    className={`recipe-servings ${servingErrorsCN}`}
                  >
                    Servings:
                    <input
                      type="text"
                      id="recipe-servings"
                      onChange={this.update("servings")}
                    />
                  </label>

                  <div className={`${instructErrorsCN}-create`}>
                    {instructErrors}
                  </div>
                  <label
                    htmlFor="recipe-directions"
                    className="recipe-directions"
                  >
                    Instructions:
                    <textarea
                      id="recipe-directions"
                      cols="30"
                      rows="17"
                      className={`${instructErrorsCN}`}
                      onChange={this.update("instructions")}
                    />
                  </label>

                  <button id="recipe-create-btn">Chef</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default RecipeCreate;