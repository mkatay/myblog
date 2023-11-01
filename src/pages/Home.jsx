import React,{useState} from 'react'
import { Categories } from '../components/Categories'
import {Posts} from '../components/Posts'
import './Home.css'
import { PopularPosts } from '../components/PopularPosts'

export const Home = () => {
  const [selectedCategories,setSelectedCategories] =useState([])
 
  //console.log('home rendering');
  return (
    <div className='home'>
      <div className="categ " >
          <Categories  selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
          <PopularPostsMemoized/>
      </div>
      <div className="posts ">
         <Posts selectedCategories={selectedCategories} />
      </div>
     
    </div>
  )
}
// Memoizált PopularPosts komponens
const PopularPostsMemoized = React.memo(PopularPosts);