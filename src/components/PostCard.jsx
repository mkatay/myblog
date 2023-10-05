import React from 'react'
import {motion} from 'framer-motion'


export const PostCard = ({category,photoURL,title,author}) => {
  return (
   
    <div className="card m-3" style={{maxWidth: '100%'}}>
    <div className="row g-0">
      <motion.div className="col-md-4" whileHover={{scale:1.1}}>
        <img src={photoURL} className="img-fluid rounded-start" alt={title}/>
      </motion.div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{title} - {category}</h5>
          <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>

  )
}
