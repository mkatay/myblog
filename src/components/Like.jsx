import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

export const Like = ({ postId, currentUser }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = async () => {
    const db = firebase.firestore();

    try {
      // Ellenőrizd, hogy a felhasználó már "like"-olta-e a bejegyzést
      const likeRef = db.collection("likes").doc(`${postId}_${currentUser.uid}`);
      const doc = await likeRef.get();

      if (doc.exists) {
        // Ha már "like"-olta, akkor "unlike"-oljuk
        await likeRef.delete();
        setLiked(false);
      } else {
        // Ha még nem "like"-olta, hozzáadjuk a "like"-ot
        await likeRef.set({ userId: currentUser.uid });
        setLiked(true);
      }
    } catch (error) {
      console.error("Hiba történt a like-olás során:", error);
    }
  };

  useEffect(() => {
    const fetchLikeStatus = async () => {
      const db = firebase.firestore();
      const likeRef = db.collection("likes").doc(`${postId}_${currentUser.uid}`);

      try {
        const doc = await likeRef.get();
        setLiked(doc.exists);
      } catch (error) {
        console.error("Hiba történt a like-olás ellenőrzése során:", error);
      }
    };

    fetchLikeStatus();
  }, [postId, currentUser]);

  return (
    <button onClick={handleLikeClick}>
      {liked ? "Unlike" : "Like"}
    </button>
  );
};
