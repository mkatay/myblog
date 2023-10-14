import { storage } from "./firebaseApp";
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import uuid from 'react-uuid'

export const uploadFile = async (file) => {
    try {
        const fileRef = ref(storage, `uploads/${uuid()+file.name.slice(-4)}`);
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);
        return downloadURL;
    } catch (error) {
      console.error('Hiba a fájl feltöltése közben', error);
      throw error;
    }
  };
  