import axios from "axios";
import { useEffect, useState } from "react";
import {Button, Input} from "@mui/material";

export const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [createpost, setCreatepost] = useState({
    title: "",
    content: ""
  });

  const createPost = (e) => {
    axios.post('http://localhost:3000/api/v1/posts',{
      title: createpost.title,
      content: createpost.content
    }).then(res => {
      const { data } = res.data;
      setPosts([...posts, {
        id: data.id,
        title: data.title,
        content: data.content
      }])
    })

  }
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/posts')
    .then((res) => {
      const { data } = res.data;
      console.log(data);
      setPosts(data);
    })
  }, []);
  return(
    <div>
      <form onSubmit={createPost}>
        <Input 
            type="text"
            name="post"
            value={createpost.title}
            placeholder="Enter text"
            onChange={e => setCreatepost({title: e.target.value})} 
        />
        {/* <Input 
            type="text"
            name="post"
            value={createpost.content}
            placeholder="Enter text"
            onChange={e => setCreatepost({content: e.target.value})} 
        /> */}
        <Button type="submit" variant="contained" color="primary">
          投稿
        </Button>
      </form>
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}