// This is the controller which serve as the bridge between  the model and view. It contain the application logic.

// NOTE; THESE NPM DEPENDENCIES IS USE TO MAKE SURE THAT EVERY ES6 SYNTAXES ARE WORKING ON THE OLD BROWSERS
// This is to polyfill every other thing else
import 'core-js/stable';
import { async } from 'regenerator-runtime';
// This is to polyfills async await syntaxes on the old browser
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

// https://forkify-api.herokuapp.com/v2

const controlRecipe = async function () {
  try {
    // declaring the id parameter in the loadRecipe of model.js as a variable
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Rendering the Spinner Effect
    recipeView.renderSpinner();

    // Loading the recipe API
    // NB; we are awaiting this method because its inside the an async function
    await model.loadRecipe(id);

    // 2.RENDERING THE RECIPE ON THE INTERFACE
    // NB; the model.state.recipe is the data the we got from model.loadRecipe(id), it is passed as an argument to the render method in the recipeView, (data=== model.state.recipe)
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    resultsView.renderSpinner();
    console.log(resultsView);
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // render results
    console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

// Using IIFE
// (function () {
//   recipeView.addHandlerRender(controlRecipe);
//   searchView.addHandlerSearch(controlSearchResult);
// })();

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResult);
};
init();
