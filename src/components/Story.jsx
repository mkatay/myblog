
import { TipTap } from './TipTap';

export const Story=({story,setStory})=>{
  
  return (
    <div className="tiptap">
    <TipTap story={story} setStory={setStory}/>
  </div>
  )
}