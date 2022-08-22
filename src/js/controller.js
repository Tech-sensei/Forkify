// NOTE; THESE NPM DEPENDENCIES IS USE TO MAKE SURE THAT EVERY ES6 SYNTAXES ARE WORKING ON THE OLD BROWSERS
// This is to polyfill every other thing else
import 'core-js/stable';
// This is to polyfills async await syntaxes on the old browser
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// 1. API CALL
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Rendering the Spinner Effect
    recipeView.renderSpinner();

    // Loading the recipe API
    await model.loadRecipe(id);

    // 2.RENDERING THE RECIPE ON THE INTERFACE
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);console.log(err);
  }
};
// controlRecipe();
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipe)
);
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
