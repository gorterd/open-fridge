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
        "input-13",
      ],
      ingredientString: {},
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount(){
    if (Object.keys(this.props.errors).length) {
      this.props.clearErrors();
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.createRecipe(this.state)
      .then((recipe) => this.props.history.push(`/recipes/${recipe.recipe._id}`))
      .catch(() => {
        this.setState({errors: this.props.errors })
        console.log(this.state)
      })
  }

  update(field){
    return (e) => {
      if (this.state.errors[field]) {
        let temp = Object.assign({}, this.state.errors);
        delete temp[field];
        this.setState({ errors: temp })
      }
      if (field === 'instructions') {
        let instruct = e.currentTarget.value.split(/\r?\n/)
        this.setState({instructions: instruct})
      } else {
        this.setState({ [field]: e.currentTarget.value });
      }
    };
  }

  updateIngredient(key){
    return (e) => {
      const update = Object.assign({}, this.state.ingredientString, {[key]:e.currentTarget.value})
      this.setState({ ingredientString: update, ingredients: Object.values(this.state.ingredientString) })
      // this.setState({ ingredients: Object.values(this.state.ingredientString) });
    }
  }

  addInput(){
    const newInput = `input-${this.state.inputs.length}`;

    return (e) => {
      e.preventDefault();
      this.setState((prevState) => ({
        inputs: prevState.inputs.concat([newInput]),
      }));
    };
  }


  render(){
    let errors = this.state.errors;
    let ingErrorsCN = "";
    let instructErrorsCN = "";
    let nameErrorsCN = "";
    let servingErrorsCN = "";
    if (errors) { 
      if (errors.ingredients) {
        ingErrorsCN = "ingredientErrors";
      }
      if (errors.instructions) {
        instructErrorsCN = "instructionErrors";
      }
      if (errors.name) {
        nameErrorsCN = "nameErrors";
      }
      if (errors.servings) {
        servingErrorsCN = "servingsErrors";
      }
    }

    return (
      <div className="recipe-create-div">
        <Link className="session-logo recipe-create-logo" to="/"></Link>
        <img
          src={storage}
          alt="openFridge"
          draggable="false"
          className="recipe-create-image"
        />

        <div className="recipe-create-div-wrap">
          <div className="recipe-create-right">
            <form onSubmit={this.addInput()} className="ingredient-outer-form">
              <div className="recipe-ingredients-div">
                <div className={`${ingErrorsCN}-create`}>{errors.ingredients}</div>
                <div className="recipe-create-ingredient-header">
                  <span className={`plabel recipe-ingredients ${ingErrorsCN}`}>
                    Ingredients:
                  </span>
                  <button id="add-ingredient-btn"></button>
                </div>
                <div className="recipe-create-ingredients-wrap">
                  {this.state.inputs.map((input, idx) => (
                    <input
                      type="text"
                      key={`recipe-ingredient-${idx}`}
                      id={`recipe-ingredient-${idx}`}
                      onChange={this.updateIngredient(`recipe-ingredient-${idx}`)}
                    />
                  ))}
                </div>
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
                <div className={`${nameErrorsCN}-create`}>{errors.name}</div>
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
                  {errors.servings}
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
                  {errors.instructions}
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

                <button id="recipe-create-btn">Create Recipe!</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeCreate;