import { NavLink } from "react-router";
import { useGetPosts } from "../hooks/useGetPosts";

export default function Home() {
  const { data: posts, isLoading, isError } = useGetPosts();
  console.log(posts)

  return (
    <div className="home">
      <h1>Witaj na blogu</h1>
      <main>
        <h2>Posty</h2>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading posts!</p>}
        {!isLoading && !isError && !!posts && (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h3>
                  <NavLink to={`/post/${post.id}`}>{post.title}</NavLink>
                </h3>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
