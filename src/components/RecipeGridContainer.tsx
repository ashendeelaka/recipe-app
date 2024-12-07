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
        dataSource={recipes}
        renderItem={(recipe: RecipeModel) => (
          <List.Item style={{ display: "flex", justifyContent: "center",margin:"30px" }}>
            <RecipeCard
              recipe={recipe}
              
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default RecipeGridContainer