import React from 'react'
import {motion} from 'framer-motion'
import { elapsedTime } from '../utility/elapsedTime';
import {truncatedStory } from '../utility/sanitizeHtml';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp} from 'react-icons/fa6';




export const PostCard = ({category,photoURL,title,author,description,timestamp,id,likes}) => {
  const navigate=useNavigate()
//console.log(timestamp.toString());

  return (
    <div className="card m-3" >
    <div className="row g-0">
      <div className="col-md-5 d-flex">
        
        <img src={photoURL} className=" cardImage rounded-start" alt={title}/>
      </div>
      <div className="col-md-7">
        <div className="card-body">
          <div className="d-flex flex-wrap justify-content-between">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{category}</p>
          </div>
          
          {/*<p className="card-text" dangerouslySetInnerHTML={htmlContent}></p>*/}
          <p className="card-text" >{truncatedStory(description)}...
              <small className="text-muted rounded p-1"style={{cursor:'pointer',fontSize:'10px',border:'1px solid gray',marginLeft:'15px'}}
                onClick={()=>navigate('detail/'+id)}
                >részletek</small>
          </p>
          <div className="d-flex flex-wrap justify-content-between">
            <p className="card-text"><small className="text-muted">{elapsedTime(timestamp) }</small></p>
            <p className="card-text">
              <small className="text-muted">{author}</small>
            </p>
            <p className="w-100 text-muted text-end"> <FaThumbsUp className='postcard-icon'/> {likes?.length}</p>
          </div>
           
        </div>
      </div>
    </div>
  </div>

  )
}
