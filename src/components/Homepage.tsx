'use client'
import { Category } from '@/models/entities';
import { Button, Card, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import RecipeGridContainer from './RecipeGridContainer';
import { useAuth } from '@/custom-hooks/UseAuth';

const Homepage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>()
  useAuth();
  useEffect(() => {
   
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        console.log("dsdsdsds", data)

        setCategories(data.slice(0, 5)); 

      } catch (err) {
        console.log("Error fetching categories: ", err)
      }
    };

    fetchCategories();
  }, []);
  return (
    <div style={{}} >
      <div style={{display:"flex", flexDirection:"row", marginTop:"2500px"}}>
      {categories.map((category: Category) =>
        <Card key={category.idCategory} style={{backgroundColor: "red", borderRadius: "30px", height:"50px",marginRight:"50px", cursor:"pointer"}} onClick={()=>setSelectedCategory(category.strCategory)}>
          <Typography.Paragraph style={{color:"white",display:"flex",alignItems:"center",justifyContent:"center"}}>{category.strCategory}</Typography.Paragraph>
        </Card>
      )}
      </div>
      <div>
        <RecipeGridContainer category={selectedCategory!} />
      </div>
      
    </div >
  )
}

export default Homepage