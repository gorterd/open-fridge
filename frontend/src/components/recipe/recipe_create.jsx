import React from 'react';
import ReactDOM from "react-dom";
import './recipe_create.css'

class RecipeCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      servings: "",
      ingredients: "", //double check item
      instructions: "", //double check item
    }

    // this.genNew = this.genNew.bind(this)
  }

  update(field) {
    return (e) => {
      // if (field === "ingredients") {
      //   let foods = this.state.ingredients;
      //   foods.push(e.currentTarget.value)
      //   this.setState({ingredients: foods})
      // } else {
        console.log("BEEPs")
        this.setState({ [field]: e.currentTarget.value })
      // }
    }
  }

  newInput(){
    return (e) => {
      if(e.keyCode === 13) {
        const newIng = document.createElement("INPUT");
        newIng.setAttribute("type", "text");
        newIng.onkeyup = this.newInput();
        newIng.onchange = this.update("ingredients");
        document
          .getElementsByClassName("ingredient-inputs")[0]
          .appendChild(newIng);
        newIng.focus()
      }
    }
  }


  render() {
    return (
      <div className="recipe-create-div">
        <div className="recipe-create-wrapper">
          <h1>Build Your Dish!</h1>
          {/* Name, servings, ingredients, instructions */}
          <form className="recipe-create-form">
            <label htmlFor="recipe-title">Recipe Name</label>
            <input
              type="text"
              id="recipe-title"
              onChange={this.update("name")}
            />
            <br />

            <div className="ingredient-inputs">
              <label htmlFor="recipe-ingredients">Ingredients</label>
              <input
                type="text"
                // value={this.state.ingredients}
                onKeyUp={this.newInput()}
                onChange={this.update("ingredients")}
              />
            </div>

            



            
          </form>
        </div>
      </div> 
    );
  }



}

export default RecipeCreate;