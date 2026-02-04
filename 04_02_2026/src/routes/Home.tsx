import { useEffect, useEffectEvent, useState } from "react";
import { NavLink } from "react-router";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = (await res.json()) as Post[];
  return data;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  const onGetData = useEffectEvent(async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  });

  useEffect(() => {
    onGetData();
  }, []);

  return (
    <div className="home">
      <h1>Witaj na blogu</h1>
      <main>
        <h2>Posty</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>
                <NavLink to={`/post/${post.id}`}>{post.title}</NavLink>
              </h3>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
