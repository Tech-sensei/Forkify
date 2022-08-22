import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcfb2'
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604691c37cdc054bd0d4'
    );
    const data = await response.json();
    console.log(response);
    console.log(data);

    if (!response.ok) throw new Error(`${data.message} ${response.status}`);
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
    console.log(state.recipe);
  } catch (err) {
      alert(err);
      console.log(err);
  }
};
