import React,{useState,useContext,useEffect} from 'react'
import { useForm } from 'react-hook-form';
import {Form,Label,Row,Col,FormGroup} from 'reactstrap'
import {uploadFile} from '../utility/uploadFile'
import { Loader } from '../components/Loader';
import { addPost } from '../utility/crudUtility';
import {UserContext} from '../context/UserContext'
import { CategContext } from '../context/CategContext';
import { NotFound } from './NotFound';
import { MyAlert } from '../components/MyAlert';
import { Story } from '../components/Story';

//const categories=['Food','Entertainment','Sports','Culture','Design','Health','Travel']

export const AddEditBlog = () => {
  const {user}=useContext(UserContext)
  const {categories}=useContext(CategContext)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange',});
  const [loading, setLoading] = useState(false);
  const [photo,setPhoto]=useState(null)
  const [uploaded,setUploaded]=useState(false)
  const [story,setStory]=useState('')

  if(!user) return( <NotFound/>)
  //console.log(user);
  //console.log(errors)
  const onSubmit =async (data, e) => {
    e.preventDefault()
    setLoading(true);
   
    //console.log(data)
    try {
      const file = data.file[0];
      const photoURL =await uploadFile(file);
      console.log('Feltöltött fájl URL-je:', photoURL);
      const newData = { ...data };
      delete newData.file;
      addPost({...newData,photoURL,author:user.displayName,userId:user.uid,description:story})
      setUploaded(true)
    } catch (error) {
      console.error('Hiba a fájl feltöltése közben', error);
    }finally {
      setLoading(false);
    //  console.log('sikeres feltöltés!');
   //alert('sikeres feltöltés!')
    }
    e.target.reset(); // reset after form submit
  };

 
  return (
    <div className='createBlog  p-3'>
      
      <h3>Create blog</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row> 
          <Col md={6}>
            <FormGroup style={{maxWidth:'300px'}}>
              <Label>Title</Label>
              <input className="form-control" type="text" {...register('title', { required: true })} />
              {errors.title && <p>Title is required.</p>}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
            <Label>Blog category</Label>
              <select className='form-select' style={{maxWidth:'300px'}} {...register('category',
                  { required: true ,
                    validate:(value=>{
                      if(value==0) return 'You must choose one category for your post!!'
                    })
                  }
              )}>
                  <option value="0">select category</option>
                  {categories.map(ctg=><option key={ctg} value={ctg}>{ctg}</option>)}
              </select>
              <p>{errors?.category?.message}</p>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Story story={story} setStory={setStory} />
        {/*<Label>Description:</Label>
        <textarea className="form-control"  {...register('description',{required:true})} cols="100" rows="10"></textarea> 
                {errors?.description && <p>Description is required!</p>}*/}
      </FormGroup>
     <Row>
        <Col md={6}>
          <FormGroup>  
              <input className="form-control" type="file" {...register('file',
                    { required: true,
                       validate: (value) => {
                        const acceptedFormats = ['jpg','png'];
                        const fileExtension = value[0]?.name.split('.').pop().toLowerCase();
                        if (!acceptedFormats.includes(fileExtension)) 
                            return 'Invalid file format.';
                        if (value[0].size > 1 * 1000 * 1024) 
                          return "File with maximum size of 1MB is allowed"
                        return true;
                    }
              })} 
              onChange={(e)=>setPhoto(URL.createObjectURL(e.target.files[0]))}
              />
              <p>{errors?.file?.message}</p>
              
          </FormGroup>
        </Col>
        <Col md={2}>
          <input type="submit" className='btn btn-primary' disabled={loading}/>
        </Col>
        <Col md={2}>
          {photo && <img className='img-thumbnail' src={photo} alt="postPhoto" />}
        </Col>
    
      </Row>
      {loading && <Loader />}
      {uploaded && <MyAlert txt={'Sikeres feltöltés!'}/>}
    </Form>
    </div>
  )
}

