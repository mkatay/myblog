//a backend kölünválasztva
import {db,storage} from "./firebaseApp";
import {collection, addDoc,doc,deleteDoc,query,getDoc,limit,getDocs,
  where,arrayUnion,arrayRemove,serverTimestamp, updateDoc,orderBy,onSnapshot } from "firebase/firestore";
import {ref, deleteObject} from "firebase/storage"
import { deleteAvatar } from "./uploadFile";
import { getAuth, deleteUser, signOut } from 'firebase/auth';

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

//felhasználói fiók törlése:
const deletePostsByAuthorId = async (userId) => {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (d) => {
    const id = d.id;
    const docRef = doc(db, 'posts', id);
    const querySnap=await getDoc(docRef)
    //console.log(querySnap.data())
    deleteFile(querySnap.data().photoURL)
    deleteDoc(docRef)
  });
}

//felhasznbáló törlése:

const auth = getAuth();

const deleteAccount = async () => {
  try {
    // Ellenőrizd, hogy a felhasználó be van-e jelentkezve
    const user = auth.currentUser;

    if (user) {
      // Töröld a felhasználót
      await deleteUser(user);
      console.log('Felhasználó törölve');
    } else {
      console.log('Nincs bejelentkezett felhasználó');
    }
  } catch (error) {
    console.error('Hiba történt a felhasználó törlése során', error);
  }
};



export const deleteProfile=async (userId)=>{
  //a hozzátartozó postok/ha van törlése:
  await deletePostsByAuthorId(userId)
  //avatar ha létezik törölni:
  await deleteAvatar(userId)
  //user törlése
  await deleteAccount(userId)
}
//dashboard:

export const readPostsRows = (setRows) => {
  const collectionRef = collection(db, "posts");
  const q = query(collectionRef, orderBy('timestamp', 'desc'))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setRows(snapshot.docs.map(doc => ({ title:doc.data().title,author:doc.data().author,userId:doc.data().userId, id: doc.id })));
  });
  return unsubscribe;
};

export const deleteSelectedPosts=async (selection)=>{
  selection.map(async (id)=>{
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    const photoURL=docSnap.data().photoURL
    await deletePost(id)
    await deleteFile(photoURL)
  })
}
