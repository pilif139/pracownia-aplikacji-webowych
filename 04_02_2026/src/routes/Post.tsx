import { useEffect, useEffectEvent, useState } from "react";
import { useParams } from "react-router";
import type { Post } from "./Home";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

async function getPostById(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );
  const data = await response.json();
  return data;
}

async function getUserById(id: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );
  const data = (await response.json()) as User;
  return data;
}

export default function Post() {
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const id = useParams().id;

  const onGetUser = useEffectEvent(async () => {
    try {
      if (!post) return;
      const user = await getUserById(post.userId);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  });

  const onGetPost = useEffectEvent(async () => {
    try {
      if (!id) return;
      const post = await getPostById(id);
      setPost(post);
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    onGetPost();
  }, [id]);

  useEffect(() => {
    if (!post) return;
    onGetUser();
  }, [post]);

  if (!post)
    return (
      <div className="post">
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="post">
      <h1>{post?.title}</h1>
      {user && (
        <div className="user">
          <p>
            Post created by {user.name}, {user.email}, {user.phone},{" "}
            {user.website}
          </p>
        </div>
      )}
      <article>
        <p>{post?.body}</p>
      </article>
    </div>
  );
}
