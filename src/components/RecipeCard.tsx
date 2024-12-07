import { RecipeModel } from '@/models/entities'
import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'

interface RecipeCardProps {
    recipe: RecipeModel
}
const RecipeCard = (props: RecipeCardProps) => {
  return (
    <div>
       <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src={props.recipe.strMealThumb} />}
  >
    <Meta title={props.recipe.strMeal} />
  </Card>
    </div>
  )
}

export default RecipeCard