import React,{useState} from 'react'
import Stack from '@mui/material/Stack';
import { SingleChip } from './SingleChip';
import { useContext } from 'react';
import { CategContext } from '../context/CategContext';
import { Typography } from '@mui/material';

export const Categories = ({selectedCategories,setSelectedCategories}) => {
    const {categories}=useContext(CategContext)
 
 // console.log(categories);
  return (
    <Stack direction="row" spacing={1} 
      sx={{dispaly:'flex',flexWrap:'wrap',justifyContent:'center',padding:'5px', gap:'10px',marginTop:'2.4rem'}}>
     <Typography sx={{width:'100%',textAlign:'center',boxShadow: '0 4px 2px -2px gray'}}>Categories</Typography>
     {categories && categories.map(ctg=>
        <SingleChip key={ctg} category={ctg} 
          selectedCategories={selectedCategories}   
          setSelectedCategories={setSelectedCategories} 
       
          />
     )}
  </Stack>
  )
}

