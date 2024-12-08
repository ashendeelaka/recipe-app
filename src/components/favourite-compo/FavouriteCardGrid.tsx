import { RecipeModel } from '@/models/entities'
import { List } from 'antd'
import React, { useEffect, useState } from 'react'
import RecipeCard from '../RecipeCard'
import { useRouter } from 'next/navigation'

const FavouriteCardGrid = () => {

    const [favRecipes, setFavRecipes] = useState<RecipeModel[]>()
    const router = useRouter()
    useEffect(() => {
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
            setFavRecipes(data);
          } catch (err) {
            console.error("Error fetching favorites", err);
          }
        };
    
        fetchFavorites();
      }, []);

      const deleteFavorite = async (recipeId: string) => {
        try {
          
          const userId = sessionStorage.getItem("userId");
          const token = sessionStorage.getItem("token");
      
          if (!userId || !token) {
            throw new Error("User is not authenticated.");
          }
      
          const response = await fetch(`/api/recipes/favorites?userId=${userId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, 
            },
            body: JSON.stringify({ recipeId: recipeId })
          });
          setFavRecipes(prev=> prev?.filter(item => item.idMeal != recipeId))

          const data = await response.json();
      
          if (!response.ok) {
            throw new Error(data.message || "Failed to delete favorite recipe.");
          }
      
          console.log("Recipe deleted successfully:", data); 
        } catch (error) {
          console.error("Error deleting favorite recipe:", error);
        }
      };



  return (
    <div>
        <List
        grid={{
          gutter: 16,
          column: 6,
          xl: 3,
          lg: 2,
          md: 2,
          sm: 1,
          xs: 1,
        }}
        dataSource={favRecipes}
        renderItem={(recipe: RecipeModel) => (
          <List.Item style={{ display: "flex", justifyContent: "center",margin:"30px" }}>
            <RecipeCard
              recipe={recipe}
              isFav= {true}
              onBtnClick = {deleteFavorite}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default FavouriteCardGrid