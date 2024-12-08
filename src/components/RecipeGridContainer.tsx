import { List } from 'antd';
import React, { useEffect, useState } from 'react'
import RecipeCard from './RecipeCard';
import { RecipeModel } from '@/models/entities';

interface RecipeGridContainer {
  category: string
}
const RecipeGridContainer = (props: RecipeGridContainer) => {
  const [recipes, setRecipes] = useState()
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(`/api/recipes?category=${props.category}`);
        const data = await res.json();

        if (res.ok) {
          setRecipes(data);
        } else {
          console.log("res not ok")
        }
      } catch (err) {
        console.log("Failed to fetch meals.", err);
      }
    };

    fetchMeals();
  }, [props.category]);

  const addFavourite = async (recipeId: string) => {
    try {
      
      const userId = sessionStorage.getItem("userId");
      const token = sessionStorage.getItem("token");
  
      if (!userId || !token) {
        throw new Error("User is not authenticated.");
      }
  
      const response = await fetch(`/api/recipes/favourites?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ recipeId: recipeId })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to add favorite recipe.");
      }
  
      console.log("Recipe added successfully:", data);
      // Optionally refresh the list of favorites or update the UI
    } catch (error) {
      console.error("Error adding favorite recipe:", error);
    }
  };
  return (
    <div style={{display:"flex", alignItems:"center", flexDirection:"column",maxWidth:"1700px"}}>
      <List
        grid={{
          gutter: 16,
          column: 6,
          xl: 4,
          lg: 2,
          md: 2,
          sm: 1,
          xs: 1,
        }}
        dataSource={recipes}
        renderItem={(recipe: RecipeModel) => (
          <List.Item style={{ display: "flex", justifyContent: "center",margin:"30px" }}>
            <RecipeCard
              recipe={recipe}
              isFav= {false}
              onBtnClick={addFavourite}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default RecipeGridContainer