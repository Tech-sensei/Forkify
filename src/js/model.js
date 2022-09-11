// This is the model which will contain all the application data which in thus contain the state and the business logic that manipulate the state.

import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

// we are creating a big object which will contain; recipe{}, search{} and the bookmark{}. Also it will contain a method called loadRecipe() which will get recipe from the server
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
};

export const loadRecipe = async function (id) {
  // we pass the id as an parameter so that it can be called in the controller.js
  try {
    // /coming from the helpers.js
    const data = await getJSON(`${API_URL}${id}`);

    // Destructuring the recipe data so we can create a new recipe object.
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      servings: recipe.servings,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.log(`${err} 💥💥`);
    throw err;
  }
};

// Search Functionality

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // console.log(state.search.results);
  } catch (err) {
    console.log(`${err} 💥💥`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; //0
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

// Updating the serving
export const updateServing = function (newServing) {
  state.recipe.ingredients.forEach(ing => {
    // newQt = oldQt * newServing / oldServing
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
  });

  state.recipe.servings = newServing;
};
