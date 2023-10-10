import React from 'react'
import { useState } from 'react'
import { TipTap } from '../components/TipTap';
import '../components/TipTap.css'
export const About = () => {
  const [story,setStory]=useState('')
  console.log(story);
  return (
    <div className='tiptap'>
    <TipTap setStory={setStory} />
    </div>
  )
}
