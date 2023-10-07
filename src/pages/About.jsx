import React from 'react'
import { Story } from '../components/Story'
import { useState } from 'react'

export const About = () => {
  const [story,setStory]=useState('')
  console.log(story);
  return (
    <div>
      <Story story={story} setStory={setStory}/>
    </div>
  )
}
