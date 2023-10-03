//a backend kölünválasztva
import {db} from "./firebaseApp";
import {collection, addDoc,doc,deleteDoc,query,
  where,getDocs,serverTimestamp, updateDoc,orderBy,onSnapshot } from "firebase/firestore";

export const addPost =async (formData) => {
    console.log(formData);
    const collectionRef= collection(db, "posts");
    const newItem={...formData,timestamp:serverTimestamp()}
    const newDocRef=await addDoc(collectionRef,newItem)
    //console.log("az új documentum azonosítója:",newDocRef.id)
  };

/*
export const readPosts = (setPosts) => {
  const collectionRef = collection(db, "posts");
  const q = query(collectionRef, orderBy('timestamp', 'desc'));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  });
  return unsubscribe;
};*/

export const readPosts = async (setPosts) => {
  const collectionRef = collection(db, "posts");
  const q = query(collectionRef, orderBy('timestamp', 'desc'));

  try {
    const snapshot = await getDocs(q);
    setPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  } catch (error) {
    console.error("Hiba történt a bejegyzések olvasása közben:", error);
  }
};

/*

  export const editTodo=async (id,todo)=>{
    const docRef= doc(db, "todolist", id);
    //setDoc(docRef, {todo,done})//felülír minden mezőt, s ha nem sorolok fel mindent, akkor kitörli, s csak a megadott mezők kerülnek be
    updateDoc(docRef, {todo})//csak azt a mezőt írja felül amit megadok
  }

  export const doneTodo=async (id,done)=>{
    //console.log(id,done);
    const docRef=doc(db, "todolist", id);
    done= done?false:true;
    updateDoc(docRef, {done})
  }

  export const deleteTodo=async (id)=>{
    //console.log('id:',id)
    const docRef= doc(db, "todolist", id);
    await deleteDoc(docRef)
  }
  
  export const queryDelete=async (userInput)=>{
    //const userInput=prompt("Mit szeretnél kitörölni? ")
    const collectionRef= collection(db, "todos");
    const q=query(collectionRef,where('todo','==',userInput))
    const snapshot= await getDocs(q)
    //console.log(snapshot)//ez egy objektum, de ebből csak a dokumentumokra van szükségünk
    const results=snapshot.docs.map((doc)=>({...doc.data(), id:doc.id}))
    //console.log(results)//megvan itt az összes id, amit ki kell törölni, következhet a törlés:
    //API hivása mindig async kell hogy legyen:
    results.forEach(async result=>{
        const docRef=doc(db, "todos",result.id)
        await deleteDoc(docRef) 
        })
    } 
  */