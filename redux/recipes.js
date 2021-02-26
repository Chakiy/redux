import axios from "axios";

// INITIALSTATE
const initialState = {
  recipes: [],
  loading: false,
  recipe: "",
  error: false,
};

// TYPES
const RECIPE_FETCH_START = "RECIPE_FETCH_START";
const RECIPE_FETCH_SUCCESS = "RECIPE_FETCH_SUCCESS";
const RECIPE_FETCH_FAIL = "RECIPE_FETCH_FAIL";

// ACTIONCREATORS

const recipeFetchStart = (str) => ({
  type: RECIPE_FETCH_START,
  payload: str,
});

const recipeFetchFail = () => ({
  type: RECIPE_FETCH_FAIL,
});

const recipeFetchSuccess = (recipes) => ({
  type: RECIPE_FETCH_SUCCESS,
  payload: recipes,
});

export const getRecipes = (str) => async (dispatch, getState) => {
  //movie saven en loading true
  dispatch(recipeFetchStart(str));

  try {
    const response = await axios(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${
        getState().recipeState.recipe
      }`
    );
    // console.log(response.data.drinks);
    dispatch(recipeFetchSuccess(response.data.drinks));
  } catch (error) {
    dispatch(recipeFetchFail());
  }
};

// REDUCER

const recipeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RECIPE_FETCH_START:
      return { ...state, recipe: payload, loading: true, error: false };
    case RECIPE_FETCH_SUCCESS:
      return { ...state, loading: false, error: false, recipes: payload };
    case RECIPE_FETCH_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default recipeReducer;
