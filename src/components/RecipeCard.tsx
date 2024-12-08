import { RecipeModel } from '@/models/entities'
import { Button, Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'

interface RecipeCardProps {
    recipe: RecipeModel,
    isFav: boolean,
    onBtnClick: (id: string) => void;
}
const RecipeCard = (props: RecipeCardProps) => {
  const handleClick = () => {
    props.onBtnClick(props.recipe.idMeal);
  };
  return (
    <div>
       <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src={props.recipe.strMealThumb} />}
  >
    <Meta title={props.recipe.strMeal} />
    <Button onClick={()=>handleClick()}>{props.isFav ?"Delete":"Add"}</Button>
  </Card>
    </div>
  )
}

export default RecipeCard