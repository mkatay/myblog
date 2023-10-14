//a backend kölünválasztva
import {db} from "./firebaseApp";
import {collection, addDoc,doc,deleteDoc,query,getDoc,
  where,getDocs,serverTimestamp, updateDoc,orderBy,onSnapshot } from "firebase/firestore";

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

export const readPost = async (id, setPost) => {
  const docRef = doc(db, "posts", id);
  try{
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPost({ ...docSnap.data(), id: docSnap.id });
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
  updateDoc(docRef, {title,category,description})//csak azt a mezőt írja felül amit megadok
  //updateDoc(docRef, {category})
  //updateDoc(docRef, {description})
}


//Ez a függvény szinkron módon működik. A getDocs függvény a Firestore adatbázisból szinkron módon lekéri az adatokat. Ez azt jelenti, hogy a függvény csak akkor tér vissza, amikor az adatokat teljesen lekérte vagy egy hibát dobott. Ez a módszer egyszerűbb lehet használni, de ha hosszú ideig tart az adatlekérés, akkor blokkolhatja az alkalmazás fő szálát.

//A választás attól függ, hogy melyik megközelítés a jobb az adott alkalmazás számára. Az aszinkron megközelítés általában ajánlott, mivel nem blokkolja az alkalmazást, és lehetővé teszi az alkalmazás folyamatos működését a háttérben. Azonban fontos kezelni az aszinkron kódhoz kapcsolódó hibákat is.
/*
export const readPosts = async (setPosts) => {
  const collectionRef = collection(db, "posts");
  const q = query(collectionRef, orderBy('timestamp', 'desc'));

  try {
    const snapshot = await getDocs(q);
    setPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  } catch (error) {
    console.error("Hiba történt a bejegyzések olvasása közben:", error);
  }
};*/

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