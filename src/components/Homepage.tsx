'use client'
import { Category } from '@/models/entities';
import { Button, Card, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import RecipeGridContainer from './RecipeGridContainer';
import { useAuth } from '@/custom-hooks/UseAuth';
import { useRouter } from 'next/navigation';

const Homepage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('beef')
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

  const getcategoryActiveColor = (category: string)=>{
    if(category == selectedCategory) {return "#ff0066"}
    return 'white'
  }
  
  return (
    <div style={{ marginTop:"150px", display:"flex", alignItems:"center", flexDirection:"column"}} >
      <div style={{display:"flex", flexDirection:"row" }}>
      {categories.map((category: Category) =>
        <Card key={category.idCategory} style={{ display:"flex",alignItems:"center",border: '1px solid #ff0066', backgroundColor: getcategoryActiveColor(category.strCategory), borderRadius: "30px", height:"50px",marginRight:"50px", cursor:"pointer"}} onClick={()=>setSelectedCategory(category.strCategory)}>
          <Typography.Paragraph style={{marginTop:"12px",color: `${selectedCategory === category.strCategory ? 'white' : '#ff0066'}`,display:"flex",alignItems:"center",justifyContent:"center"}}>{category.strCategory}</Typography.Paragraph>
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