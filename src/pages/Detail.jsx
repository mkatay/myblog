import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { deleteFile, deletePost, editLikes, readPost } from '../utility/crudUtility'
import {FaThumbsUp,FaTrash,FaPen} from 'react-icons/fa6'
import parse from "html-react-parser";
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useConfirm } from "material-ui-confirm";
import { MyAlert } from '../components/MyAlert'
import './Detail.css'

export const Detail = () => {
  const {user}=useContext(UserContext)
  const [post,setPost]=useState(null)
  const [likes,setLikes]=useState(0)
  const params=useParams()
  const navigate=useNavigate()
  const confirm = useConfirm();
  const [msg,setMsg]=useState('')

  console.log('detail:',params)
  useEffect(()=>{
    readPost(params.id,setPost,setLikes)
    
  },[])
console.log(post?.author,user?.displayName);

const handleDelete = async () => {
  try {
    await  confirm({ description:'Ez egy visszavonhatatlan művelet!',
                    confirmationText:'igen',
                    cancellationText:'mégsem',
                    title:'Biztosan ki szeretnéd törölni?'
           })
    console.log('igen');
    const result=await deleteFile(post.photoURL)
    if(result){
      deletePost(post.id)
      navigate('/')
    }else{
      console.log('nem sikerült....');
    }
  } catch (error) {
      console.error('mégsem');
  }
}

const handleLikes=async ()=>{
  if(user){
    console.log(post.id,user.uid);
    const likeCount=await editLikes(post.id,user.uid)
    setLikes(likeCount)
  }else{
    console.log('nem vagy bejelentkezve!');
    setMsg('nem vagy bejelentkezve!')
  }
}
  return (
    <div className="singlePost container">
    
      <div className="image-container">
         {post &&  <img  className="image" src={post?.photoURL} alt={post?.title}  
          onClick={()=> window.open(post?.photoURL, "_blank")} 
         />}
      </div>
    
       <h3 className="text-center m-2">
          {post?.title}
       </h3>
    
       <div className="d-flex justify-content-between  text-secondary">
         <span className="singlePostAuthor">{post?.author}</span>
      
       </div>
       {post && <p className="post-text" >{parse(post.description)}</p>}
      <div className="d-flex justify-content-between ">
        <div className='d-flex gap-2 align-items-center'>
          <FaThumbsUp className='text-primary  icon' onClick={handleLikes}/>
          <span>{likes}</span>
        </div>
        {(user && post && user.uid==post.userId)   &&
          <div>
            <FaTrash className='text-danger  icon' onClick={handleDelete}/>
            <FaPen className='text-warning  icon'   onClick={()=>navigate('/update/'+post.id)}/>
          </div>
        }
       </div>
       {msg && <MyAlert txt={msg}/>}  
       <div className="d-flex justify-content-center">
          <button  className='btn btn-light ' onClick={()=>navigate('/')}>vissza...</button>    
        </div>  
                    
 </div>
  )
}
