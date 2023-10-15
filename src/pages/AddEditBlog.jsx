import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Label, Row, Col, FormGroup } from "reactstrap";
import { uploadFile } from "../utility/uploadFile";
import { Loader } from "../components/Loader";
import { addPost, editPost, readPost } from "../utility/crudUtility";
import { UserContext } from "../context/UserContext";
import { CategContext } from "../context/CategContext";
import { NotFound } from "./NotFound";
import { MyAlert } from "../components/MyAlert";
import { Story } from "../components/Story";
import { useParams } from "react-router-dom";


//const categories=['Food','Entertainment','Sports','Culture','Design','Health','Travel']

export const AddEditBlog = () => {
  const { user } = useContext(UserContext);
  const { categories } = useContext(CategContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onChange" });
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [story, setStory] = useState("");
  const [post, setPost] = useState(null); //csak azért kell h editálás esetésn tudjuk használni ugyanazt a readPost() függvényt

  const params = useParams();
  useEffect(() => {
    if (params?.id) {
      readPost(params.id, setPost);
    }
  }, [params?.id]);

  useEffect(() => {
    if (post) {
      setValue("title", post?.title);
      setValue("category", post?.category);
      setPhoto(post?.photoURL);
    }
  }, [post]);
  //console.log(post);

  if (!user) return <NotFound />;

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    if (params.id) {
      //update esetén
      try {
        const newData = { ...data };
        editPost(params.id, { ...newData, description: story });
        setUploaded(true);
      } catch (err) {
        console.error("Hiba update közben", err);
      } finally {
        setLoading(false);
      }
    } else {
      //új post esetén
      try {
        const file = data.file[0];
        console.log(file);
        const photoURL = await uploadFile(file);
        console.log("Feltöltött fájl URL-je:", photoURL);
        const newData = { ...data };
        delete newData.file;
        addPost({
          ...newData,
          photoURL,
          author: user.displayName,
          userId: user.uid,
          description: story,
          likes:[]
        });
        setUploaded(true);
      } catch (error) {
        console.error("Hiba a fájl feltöltése közben", error);
      } finally {
        setLoading(false);
      }
    }

    e.target.reset(); // reset after form submit
  };

  return (
    <div className="createBlog  p-3">
      <h3>Create blog</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            <FormGroup style={{ maxWidth: "300px" }}>
              <Label>Title</Label>
              <input
                className="form-control"
                type="text"
                {...register("title", { required: true })}
              />
              {errors.title && <p>Title is required.</p>}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Blog category</Label>
              <select
                className="form-select"
                style={{ maxWidth: "300px" }}
                {...register("category", {
                  required: true,
                  validate: (value) => {
                    if (value == 0)
                      return "You must choose one category for your post!!";
                  },
                })}
              >
                <option value="0">select category</option>
                {categories.map((ctg) => (
                  <option key={ctg} value={ctg}>
                    {ctg}
                  </option>
                ))}
              </select>
              <p>{errors?.category?.message}</p>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Story story={post?.description} setStory={setStory} />
          {/*<Label>Description:</Label>
        <textarea className="form-control"  {...register('description',{required:true})} cols="100" rows="10"></textarea> 
                {errors?.description && <p>Description is required!</p>}*/}
        </FormGroup>
        <Row>
          {!params.id && (
            <Col md={6}>
              <FormGroup>
                <input
                  className="form-control"
                  type="file"
                  {...register("file", {
                    required: true,
                    validate: (value) => {
                      const acceptedFormats = ["jpg", "png"];
                      const fileExtension = value[0]?.name
                        .split(".")
                        .pop()
                        .toLowerCase();
                      if (!acceptedFormats.includes(fileExtension))
                        return "Invalid file format.";
                      if (value[0].size > 1 * 1000 * 1024)
                        return "File with maximum size of 1MB is allowed";
                      return true;
                    },
                  })}
                  onChange={(e) =>
                    setPhoto(URL.createObjectURL(e.target.files[0]))
                  }
                />
                <p>{errors?.file?.message}</p>
              </FormGroup>
            </Col>
          )}
          <Col md={2}>
            <input
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            />
          </Col>
          <Col md={2}>
            {photo && (
              <img className="img-thumbnail" src={photo} alt="postPhoto" />
            )}
          </Col>
        </Row>
        {loading && <Loader />}
        {uploaded && <MyAlert txt={"Sikeres feltöltés!"} />}
      </Form>
    </div>
  );
};
