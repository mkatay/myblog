import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { popularPosts } from '../utility/crudUtility'
import { useNavigate } from 'react-router-dom'

export const PopularPosts = () => {
    const [populars,setPopulars]=useState(null)
    const navigate=useNavigate()
  console.log('PopularPosts rendering')
    useEffect(()=>{
        popularPosts(setPopulars)
    },[])
 
  return (
    <div className='mt-3 d-flex flex-column gap-1 align-items-center'> 
       <h6 className='border border-bottom'>Popular posts</h6>
        {populars && populars.map(obj=>
            <div className='btn btn-outline-secondary' key={obj.id}
              onClick={()=>navigate('/detail/'+obj.id)}>
                {obj.title}
            </div>
            )}
    </div>
  )
}
