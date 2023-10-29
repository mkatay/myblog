import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Label, Row, Col, FormGroup } from "reactstrap";
import { uploadAvatar } from "../utility/uploadFile";
import { Loader } from "../components/Loader";
import { UserContext } from "../context/UserContext";
import { NotFound } from "./NotFound";
import { MyAlert } from "../components/MyAlert";
import { useConfirm } from "material-ui-confirm";
import { deleteProfile } from "../utility/crudUtility";


export const Profile = ({setAvatar}) => {
  const { user,logoutUser} = useContext(UserContext);

  const {register,handleSubmit,formState: { errors }} = useForm({ mode: "onChange" });
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const confirm = useConfirm();

  if (!user) return <NotFound />;

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const file = data.file[0];
      console.log(file);
      const photoURL = await uploadAvatar(file,user.uid);
      setAvatar(photoURL)
      setUploaded(true);
    } catch (error) {
      console.error("Hiba a fájl feltöltése közben", error);
    } finally {
      setLoading(false);
    }
    e.target.reset(); // reset after form submit
  };

  const handleDelete = async () => {
    try {
      await  confirm({ description:'Ez egy visszavonhatatlan művelet!',
                      confirmationText:'igen',
                      cancellationText:'mégsem',
                      title:'Biztosan ki szeretnéd törölni a felhasználói fiókodat?'
             })
      await deleteProfile(user.uid) 
      // Kiléptetés a sikeres törlés után
      logoutUser()
    } catch (error) {
        console.log('mégsem:',error);
    }
  }

  return (
    <div className="profile  p-3">
      <h3>User profile</h3>
      <h6>{user.email}</h6>
      <Form onSubmit={handleSubmit(onSubmit)} className="border-bottom border-secondary p-3">
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Avatar:</Label>
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
        </Row>
        <Row>
          <Col md={2}>
            <input type="submit" className="btn btn-primary" disabled={loading}/>
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

      <button className="btn btn-danger m-2" onClick={handleDelete}>
          Felhasználói fiók törlése
      </button>

    </div>
  );
};
