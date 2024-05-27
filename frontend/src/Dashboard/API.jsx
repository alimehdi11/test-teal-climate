import { data } from "autoprefixer";
import React, { useState, useEffect } from "react";

const API = () => {
  const [post, setPosts] = useState([]);
  const [data, setData] = useState([]);
  //first method

  // useEffect(()=>{
  //     fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
  //     .then(response => response.json())
  //     .then(data => setPosts(data))
  //     .catch(error => console.error('Error fetching posts: ', error));

  // },[])

  //second method to fetch API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const josnData = await response.json();
        setPosts(josnData);
      } catch {
        console.log("Error Fetching Data: ");
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {post.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default API;
