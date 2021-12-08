import axios from "axios";
import { useEffect, useState } from "react";


export const Blog = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/posts')
    .then((res) => {
      const { data } = res.data;
      console.log(res);
      setPosts(data);
    })
  }, []);
  return(
    <div>
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}