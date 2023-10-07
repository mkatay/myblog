import { useState } from 'react';
import { RichTextEditor } from '@mantine/rte';


export const Story=({story,setStory})=>{
  console.log('story-text-editor:',story);
  const [value, onChange] = useState(story);
  console.log(value)
  return (
    <div className="contact-holder">
    <RichTextEditor value={value} onChange={onChange} className="editor" onBlur={()=>setStory(value)}
            controls={[
                ['bold', 'italic', 'underline', 'link'],
                ['unorderedList','orderedList', 'h1', 'h2', 'h3',],
                ['sup', 'sub'],
                ['alignLeft', 'alignCenter', 'alignRight'],
            ]}
  />
  </div>
  )
}