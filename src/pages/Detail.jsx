import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { readPost } from '../utility/crudUtility'
import {FaThumbsUp,FaTrash,FaPen} from 'react-icons/fa6'
import parse from "html-react-parser";
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'


export const Detail = () => {
  const {user}=useContext(UserContext)
  const [post,setPost]=useState(null)
  const params=useParams()
  const navigate=useNavigate()

  console.log('detail:',params)
  useEffect(()=>{
    readPost(params.id,setPost)
  },[])
console.log(post?.author,user?.displayName);

  return (
    <div className="singlePost container">
    <div className="p-3">
     {post &&  <img src={post?.photoURL} alt={post?.title}  />}
       <h3 className="text-center m-2">
          {post?.title}
       </h3>
    
       <div className="d-flex justify-content-between  text-secondary">
         <span className="singlePostAuthor">{post?.author}</span>
      
       </div>
       {post && <p className="post-text" >{parse(post.description)}</p>}
       {user && <div className="d-flex justify-content-end gap-5 icons">
          <FaThumbsUp className='text-primary'/>
          <FaTrash className='text-danger'/>
          <FaPen className='text-warning'   onClick={()=>navigate('/update/'+post.id)}/>
       </div>}
   </div>                          
 </div>
  )
}
