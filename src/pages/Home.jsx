import React,{useState} from 'react'
import { Categories } from '../components/Categories'
import {Posts} from '../components/Posts'
import './Home.css'

export const Home = () => {
  const [selectedCategories,setSelectedCategories] =useState([])
  return (
    <div className='home'>
      <div className="categ " >
          <Categories  selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
      </div>
      <div className="posts ">
         <Posts selectedCategories={selectedCategories} />
      </div>
     
    </div>
  )
}
