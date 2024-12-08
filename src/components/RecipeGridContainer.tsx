import { List } from 'antd';
import React, { useEffect, useState } from 'react'
import RecipeCard from './RecipeCard';
import { RecipeModel } from '@/models/entities';
import { useRouter } from 'next/navigation';

interface RecipeGridContainer {
  category: string
}
const RecipeGridContainer = (props: RecipeGridContainer) => {
  const [recipes, setRecipes] = useState()
  const [favorites, setFavorites] = useState<string[]>([]);
  const router = useRouter()
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

    const fetchFavorites = async () => {
      const userId = sessionStorage.getItem('userId');
      const token = sessionStorage.getItem('token');
      
      if (!userId || !token) {
        router.push('/sign-in')
        return};
      
      try {
        const res = await fetch(`/api/recipes/favourites?userId=${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setFavorites(data.map((fav: RecipeModel) => fav.idMeal));
      } catch (err) {
        console.error("Error fetching favorites", err);
      }
    };

    fetchMeals();
    fetchFavorites()

  }, [props.category]);

  const addFavourite = async (recipeId: string) => {
    const isFavorite = favorites.includes(recipeId);
    try {
      
      const userId = sessionStorage.getItem("userId");
      const token = sessionStorage.getItem("token");
  
      if (!userId || !token) {
        throw new Error("User is not authenticated.");
      }
  
      const response = await fetch(`/api/recipes/favourites?userId=${userId}`, {
        method:  isFavorite ? 'DELETE' : 'POST',
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
      setFavorites((prev) =>
        isFavorite ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
      );
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
              isFav= {favorites.includes(recipe.idMeal)}
              onBtnClick={addFavourite}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default RecipeGridContainer