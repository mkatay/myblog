import { storage } from "./firebaseApp";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  list,
  deleteObject,
} from "firebase/storage";
import {v4 as uuidv4} from "uuid";

export const uploadFile = async (file) => {
  try {
    const fileRef = ref(storage, `uploads/${uuidv4() + file.name.slice(-4)}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.error("Hiba a fájl feltöltése közben", error);
    throw error;
  }
};

export const uploadAvatar = async (file, userId) => {
  try {
    const storageRef = ref(storage, "avatars/"); // Az "avatars" könyvtárra mutató referencia
    const result = await list(storageRef);
    const filesRef = result.items;
    console.log("filesRef:", filesRef);
    if (filesRef[0]) {
      const fRef = filesRef[0]; //az első fájlra mutató referenciát használjuk
      const downloadUrl = await getDownloadURL(fRef);
      //console.log(downloadUrl);
      if (downloadUrl.indexOf(userId) != -1)
        await deleteObject(fRef, downloadUrl);
    }
    // Új fájl feltöltése
    const fileRef = ref(storage, `avatars/${userId + file.name.slice(-4)}`);
    await uploadBytes(fileRef, file);
    const photoUrl = await getDownloadURL(fileRef);
    return photoUrl;
  }catch (err) {
      console.log("Hiba a fájlfeltöltés során:", err);
      throw err;
  }
};

export const getAvatar = async (userId, setAvatar) => {
  const storageRefPng = ref(storage, `avatars/${userId}.png`); // PNG kiterjesztés
  const storageRefJpg = ref(storage, `avatars/${userId}.jpg`); // JPG kiterjesztés
  try {
    let downloadUrl;
    try {
      downloadUrl = await getDownloadURL(storageRefPng);
    } catch (pngError) {
      // Ha a PNG verzió nem található, próbálkozzunk a JPG verzióval
      downloadUrl = await getDownloadURL(storageRefJpg);
    }
    setAvatar(downloadUrl);
  } catch (err) {
    console.log("Hiba az avatár letöltése során:", err);
  }
};
/*export const deleteAvatar=async (userId)=>{
  let downloadURL
  try{
    const storageRefPng = ref(storage, `avatars/${userId}.png`); // PNG kiterjesztés,
  downloadURL=await getDownloadURL(storageRefPng)
  if(downloadURL)  await deleteObject(storageRefPng)
   const storageRefJpg = ref(storage, `avatars/${userId}.jpg`); // JPG kiterjesztés,
  downloadURL=await getDownloadURL(storageRefJpg)
  if(downloadURL)   await deleteObject(storageRefJpg)
  }catch(msg){
    console.log('nincs törlendő avatar!',msg);
  }
}*/
export const deleteAvatar = async (userId) => {
  let downloadURL;
  let pngFound = false;

  try {
    const storageRefPng = ref(storage, `avatars/${userId}.png`); // PNG kiterjesztés,
    downloadURL = await getDownloadURL(storageRefPng);

    if (downloadURL) {
      await deleteObject(storageRefPng);
      pngFound = true;
    }
  } catch (msg) {
    console.log('PNG törlése nem sikerült!', msg);
  }

  if (!pngFound) {
    try {
      const storageRefJpg = ref(storage, `avatars/${userId}.jpg`); // JPG kiterjesztés,
      downloadURL = await getDownloadURL(storageRefJpg);

      if (downloadURL) {
        await deleteObject(storageRefJpg);
      }
    } catch (msg) {
      console.log('JPG törlése nem sikerült!', msg);
    }
  }
}
