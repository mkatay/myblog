import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { readPost } from '../utility/crudUtility'
//import { MyEditor } from '../components/MyEditor'

export const Detail = () => {
  const [post,setPost]=useState(null)
  const params=useParams()
  console.log('detail:',params)
  useEffect(()=>{
    readPost(params.id,setPost)
  },[])
console.log(post);
// Az HTML-t beállítjuk a dangerouslySetInnerHTML segítségével
const htmlContent =post? { __html: post.description }: null

  return (
    <div className="singlePost">
    <div className="p-3">
     {post &&  <img src={post?.photoURL} alt={post?.title}  />}
       <h3 className="text-center m-2">
          {post?.title}
           {/*<div className="singlePostEdit text-end">
              <i role="button" className={user.userId===post.user_id? "fa-solid fa-pen-to-square text-success": "d-none"}
                 onClick={()=>navigate('/editPost/'+post.id)}></i>
              <i role="button" className={user.userId===post.user_id? "fa-solid fa-trash-can ms-3 text-danger": "d-none"}
                 onClick={()=>handleDelete()}></i>
  </div>*/}
       </h3>
    
       <div className="d-flex justify-content-between mb-2 text-secondary">
         <span className="singlePostAuthor">{post?.author}</span>
      
       </div>
      {htmlContent && <p className="post-text" dangerouslySetInnerHTML={htmlContent}></p>}
   </div>                          
 </div>
  )
}
