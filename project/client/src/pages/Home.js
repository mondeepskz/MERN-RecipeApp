import { useState, useEffect} from "react";
import { useGetUserId } from "../hooks/useGetUserId.js";
import axios from "axios";
import { useCookies } from "react-cookie";

export const Home = () => {
  const [recipes,setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const[cookies,_] = useCookies(["access_token"])

  const userId = useGetUserId();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userId}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchRecipes();

    if (cookies.access_token) 
       fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", 
      {
        recipeID,
        userId,
      },
      { headers: { authorization: cookies.access_token }  }
      );
      console.log(response);
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}                
              </button>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );

}