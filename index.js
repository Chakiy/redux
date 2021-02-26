import store from "./redux/store.js";
import { setValue, increment, decrement } from "./redux/counter.js";
//of import * as actions from "./redux/counter";

import { getRecipes } from "./redux/recipes.js";

/**
 * COUNTER ZONE
 */

// UITLEZEN VAN STOREDATA (.getState())
console.log(store.getState());
function updateCounterValue() {
  const { counter } = store.getState().counterState; //extracting child as var from object = ES6 object destructuring
  document.getElementById("counter").innerText = counter;
  document.getElementById("counterfield").value = counter;
}

updateCounterValue();

//ELKE KEER DAT DE STORE AANGEPAST WORDT
store.subscribe(updateCounterValue);

//UISTUREN VAN ACTION OM ZO ONRECHTSTREEKS DATA TE MANIPULEREN

document.getElementById("inc").onclick = () => store.dispatch(increment());

document.getElementById("dec").onclick = () => store.dispatch(decrement());

document.getElementById("counterfield").oninput = (e) =>
  store.dispatch(setValue(parseInt(e.target.value)));

/**
 * MOVIEZONE
 */

document.getElementById("recipesform").onsubmit = (e) => {
  e.preventDefault();
  store.dispatch(
    getRecipes(document.querySelector("#recipesform input").value)
  );
  document.querySelector("#recipesform input").value = "";
};

function recipeRender() {
  const { recipe, loading, recipes } = store.getState().recipeState;
  document.getElementById("titel").innerText = recipe;
  if (loading) {
    document.getElementById("loading").style.display = "block";
  } else {
    document.getElementById("loading").style.display = "none";
  }
  if (recipes) {
    document.getElementById("recipesgrid").innerHTML = recipes
      .map((recipe) => `<li class="drink">${recipe.strDrink}</li>`)
      .join("");
  } else {
    document.getElementById("recipesgrid").style.display = "none";
  }
}

recipeRender();

store.subscribe(recipeRender);
