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
import paginationView from './Views/paginationView.js';

// https://forkify-api.herokuapp.com/v2

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    // declaring the id parameter in the loadRecipe of model.js as a variable
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Rendering the Spinner Effect
    recipeView.renderSpinner();

    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

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
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3)render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 3)render new results
  // resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 4) Render new pagination button
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServing(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView._addHandlerClick(controlPagination);
};
init();
