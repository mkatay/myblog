import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { readPosts } from '../utility/crudUtility'
import { PostCard } from './PostCard'

export const Posts = () => {
    const [posts,setPosts]=useState([])
    useEffect(()=>{
        readPosts(setPosts)
    },[])
    console.log(posts);
  return (
    <div>
        <h2>Daily blogs</h2>
        <hr />
        {posts.map(obj=>
            <PostCard key={obj.id} {...obj}/>
            )}
    </div>
  )
}
