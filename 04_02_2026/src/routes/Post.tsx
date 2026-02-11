import { useParams } from "react-router";
import { useGetUser } from "../hooks/useGetUser";
import { useGetPost } from "../hooks/useGetPost";

export default function Post() {
  const id = useParams().id as string;

  const { data: post, ...postQuery } = useGetPost(id);
  const { data: user, ...userQuery } = useGetUser(post?.userId as string);

  if (postQuery.isLoading || userQuery.isLoading)
    return (
      <div className="post">
        <h1>Loading...</h1>
      </div>
    );

  if (postQuery.isError || userQuery.isError)
    return (
      <div className="post">
        <h1>Error</h1>
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
