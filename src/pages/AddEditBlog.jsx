import React,{useState,useContext} from 'react'
import { useForm } from 'react-hook-form';
import {Form,Label,Row,Col,FormGroup} from 'reactstrap'
import {uploadFile} from '../utility/uploadFile'
import { Loader } from '../components/Loader';
import { addPost } from '../utility/crudUtility';
import {UserContext} from '../context/UserContext'

const categories=['Food','Entertainment','Sports','Culture','Design','Health','Travel']

export const AddEditBlog = () => {
  const {user}=useContext(UserContext)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange',});
  const [loading, setLoading] = useState(false);

  console.log(user);
 
  const onSubmit =async (data, e) => {
    e.preventDefault()
    setLoading(true);
    //e.target.reset(); // reset after form submit
    console.log(data)
    try {
      const file = data.file[0];
      const downloadURL =await uploadFile(file);
      console.log('Feltöltött fájl URL-je:', downloadURL);
      const newData = { ...data };
      delete newData.file;
      addPost({...newData,photoUrl:downloadURL,author:user.displayName,userId:user.uid})
    } catch (error) {
      console.error('Hiba a fájl feltöltése közben', error);
    }finally {
      setLoading(false);
    }
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
              <select className='form-select' style={{maxWidth:'300px'}} {...register('category')}>
                  <option value="0">select category</option>
                  {categories.map(ctg=><option key={ctg} value={ctg}>{ctg}</option>)}
              </select>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label>Description:</Label>
        <textarea className="form-control"  {...register('description')} cols="100" rows="10"></textarea> 
      </FormGroup>
     <Row>
        <Col md={6}>
          <FormGroup>  
              <input className="form-control" type="file" {...register('file')} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <Label className='px-2'> Are you a developer?</Label>
            <FormGroup className='form-check-inline'>    
              <input className="form-check-input"type="radio" value="Yes" {...register('developer')} />  
              <Label check className='px-2'>Yes</Label>
              <input className="form-check-input"type="radio" value="No" {...register('developer')} />  
              <Label check className='px-2'>No</Label>
            </FormGroup>
        </Col>
      </Row>
      <input type="submit" className='btn btn-primary' disabled={loading}/>
      {loading && <Loader />}
    </Form>
    </div>
  )
}

