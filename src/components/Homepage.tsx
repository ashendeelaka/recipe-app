'use client'
import { Category } from '@/models/entities';
import { Button, Card, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import RecipeGridContainer from './RecipeGridContainer';
import { useAuth } from '@/custom-hooks/UseAuth';
import { useRouter } from 'next/navigation';

const Homepage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>()
  const router = useRouter()
  // useAuth();
  useEffect(() => {
   
    const fetchCategories = async () => {
      const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('/sign-in');
    }
      try {
        const res = await fetch("/api/categories",{
          method: 'GET',
          headers: {
              Authorization: `Bearer ${token}`
          },
      });
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
    <div style={{ marginTop:"150px", display:"flex", alignItems:"center", flexDirection:"column"}} >
      <div style={{display:"flex", flexDirection:"row" }}>
      {categories.map((category: Category) =>
        <Card key={category.idCategory} style={{backgroundColor: "#ff0066", borderRadius: "30px", height:"50px",marginRight:"50px", cursor:"pointer"}} onClick={()=>setSelectedCategory(category.strCategory)}>
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