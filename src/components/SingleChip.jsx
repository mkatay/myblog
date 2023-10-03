import React,{useState} from 'react'
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export const SingleChip = ({category,selectedCategories,setSelectedCategories}) => {
    const [selected,setSelected]=useState(false)

    const handleClick = () => {
       // console.info('You clicked the Chip.');
        if(selectedCategories.indexOf(category) === -1){
          setSelected(true)
          setSelectedCategories((prev)=>[...prev,category])
        }
        else{
            setSelected(false)
            setSelectedCategories(selectedCategories.filter(item=>item != category))
        }
        
      };
  return (
    <Chip
    label={category}
    clickable
    onClick={()=>handleClick()}
    
    sx={{margin:'2px'}}
    icon={selected ? <DoneIcon /> : <RadioButtonUncheckedIcon /> }
/>
  )
}

