import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { readPosts } from "../utility/crudUtility";
import { PostCard } from "./PostCard";
import {motion} from 'framer-motion'

export const Posts = ({ selectedCategories }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    readPosts(setPosts, selectedCategories);
  }, [selectedCategories]);
  console.log(posts);
  return (
    <div>
      <motion.div
        initial={{ x: "50vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", delay: 0.5 }}
      >
        <h2>Daily blogs</h2>
      </motion.div>

      <hr />
      {posts.map((obj) => (
        <PostCard key={obj.id} {...obj} />
      ))}
    </div>
  );
};
