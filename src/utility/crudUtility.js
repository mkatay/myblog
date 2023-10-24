//a backend kölünválasztva
import {db,storage} from "./firebaseApp";
import {collection, addDoc,doc,deleteDoc,query,getDoc,limit,
  where,arrayUnion,arrayRemove,serverTimestamp, updateDoc,orderBy,onSnapshot, getDocs } from "firebase/firestore";
import {ref, deleteObject, getDownloadURL} from "firebase/storage"

export const deleteFile=async (photoURL)=>{
  console.log(photoURL);
 const imageRef=ref(storage,photoURL)
 try{
  await deleteObject(imageRef)
  return true
 }catch(err){
   console.log('deleteFile:',err);
   return false
 }
}
export const deletePost=async (id)=>{
  //console.log('id:',id)
  const docRef= doc(db, "posts", id);
  await deleteDoc(docRef)
}
export const addPost =async (formData) => {
    console.log(formData);
    const collectionRef= collection(db, "posts");
    const newItem={...formData,timestamp:serverTimestamp()}
    const newDocRef=await addDoc(collectionRef,newItem)
    //console.log("az új documentum azonosítója:",newDocRef.id)
  };

//Ez a függvény aszinkron módon működik. Az onSnapshot függvény egy eseményfigyelő, amely figyeli 
//a Firestore adatbázisban történő változásokat. Amikor a posts gyűjteményben változás történik (pl. új bejegyzés hozzáadása), akkor az onSnapshot meghívódik, és frissíti a bejegyzéseket az aktuális adatokkal.
export const readPosts = (setPosts,selectedCategories) => {
  const collectionRef = collection(db, "posts");
  const q =selectedCategories.length==0 ?  query(collectionRef, orderBy('timestamp', 'desc'))
                                        : query(collectionRef,where('category','in',selectedCategories))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  });
  return unsubscribe;
};

export const readPost = async (id, setPost,setLikes) => {
  const docRef = doc(db, "posts", id);
  try{
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPost({ ...docSnap.data(), id: docSnap.id });
      setLikes(docSnap.data().likes.length)
    } else {
      console.log("A dokumentum nem található.");
    }
  } catch (error) {
    console.error("Hiba a dokumentum olvasása közben:", error);
  }
};
    
export const editPost=async (id,{title,category,description})=>{
  const docRef= doc(db, "posts", id);
  //setDoc(docRef, {todo,done})//felülír minden mezőt, s ha nem sorolok fel mindent, akkor kitörli, s csak a megadott mezők kerülnek be
  await updateDoc(docRef, {title,category,description})//csak azt a mezőt írja felül amit megadok
  //updateDoc(docRef, {category})
  //updateDoc(docRef, {description})
}

export const editLikes=async (postId,userId)=>{
  console.log(postId,userId);
  const docRef= doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data());
  console.log(docSnap.data().likes.indexOf(userId))
  let likeCount=docSnap.data().likes.length//azért hogy ne kelljen minden likeolás után újra futtani a readPost()-t
  if(docSnap.data().likes.indexOf(userId)==-1){
    await updateDoc(docRef, {likes: arrayUnion(userId)})
    likeCount++
  }else{
    await updateDoc(docRef, {likes: arrayRemove(userId)});
    likeCount--
  }
  await updateDoc(docRef,{likeCount})
  return likeCount
}

export const popularPosts=async (setPopulars)=>{
  const collectionRef = collection(db, "posts");
  const q = query(collectionRef, orderBy("likes","desc"), limit(3));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setPopulars(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  });
  return unsubscribe;

}
export const updateAvatar=async (avatarUrl,userId)=>{
  const collectionRef = collection(db, "users");
  const q =query(collectionRef,where('userId','==',userId))
  const querySnapshot = await getDocs(q);
  let docId=null
  querySnapshot.forEach(doc => docId=doc.id)
  if(docId){
      const docRef=doc(db, "users", docId);
      await updateDoc(docRef, {avatarUrl})
      console.log('update');
  } else {
      const collectionRef= collection(db, "users");
      await addDoc(collectionRef,{userId,avatarUrl})
      console.log('új');
  } 
}

export const getAvatar = async (userId, setAvatar) => {
  try {
    const pngAvatarRef = ref(storage, `avatars/${userId}.png`);
    const jpgAvatarRef = ref(storage, `avatars/${userId}.jpg`);
    
    // Ellenőrizzük, hogy a PNG kiterjesztéssel rendelkező fájl létezik-e
    if (await getDownloadURL(pngAvatarRef).catch(() => null)) {
      const downloadURL = await getDownloadURL(pngAvatarRef);
      console.log('downloadURL (PNG):', downloadURL);
      setAvatar(downloadURL);
      return;
    }
    
    // Ellenőrizzük, hogy a JPG kiterjesztéssel rendelkező fájl létezik-e
    if (await getDownloadURL(jpgAvatarRef).catch(() => null)) {
      const downloadURL = await getDownloadURL(jpgAvatarRef);
      console.log('downloadURL (JPG):', downloadURL);
      setAvatar(downloadURL);
      return;
    }

    // Ha egyik fájl sem létezik, akkor itt kezeld le a hibát vagy tedd meg a szükséges intézkedéseket
  } catch (error) {
    console.error('Nincs avatar:', error);
    setAvatar(null)
  }
}


