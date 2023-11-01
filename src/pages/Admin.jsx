import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { NotFound } from './NotFound';
import { deleteSelectedPosts, readPosts, readPostsRows } from '../utility/crudUtility';
import { useState } from 'react';
import { useEffect } from 'react';
import { Loader } from '../components/Loader';

const columns = [
  { field: 'id', headerName: 'Post ID', width: 250 },
  {
    field: 'title',
    headerName: 'Post title',
    width: 150,
    /*editable: true,*/
  },
  {
    field: 'author',
    headerName: 'Author',
    width: 150,
    /*editable: true,*/
  },
  {
    field: 'userId',
    headerName: 'Author\'s ID',
    /*type: 'number',*/
    width: 250,
    /*editable: true,*/
  },
 /* {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },*/
];


export const Admin=()=> {
    const {role}=useContext(UserContext)
    const [rows,setRows]=useState([])
    const [selection, setSelection] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      readPostsRows(setRows)
    }, [loading]);
   
    if (role!='admin') return <NotFound />;  
console.log('selection:',selection);

    const handleDelete=async ()=>{
        setLoading(true)
        await deleteSelectedPosts(selection)
        setLoading(false)
    }
  return (
    <div className='container'>
    <Box sx={{ height: 400, width: '100%' }}>
      {rows && 
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(id) =>setSelection(id)}
      />
    }
    </Box>
    
    <button className="btn btn-danger m-2" onClick={handleDelete}>
          delete selected posts
      </button>
      {loading && <Loader />}
    </div>
  );
}
