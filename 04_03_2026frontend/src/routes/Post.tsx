import { useParams } from "react-router";
import { useGetPost } from "../hooks/useGetPost";
import { useMutation } from "@tanstack/react-query";
import postComment from "../hooks/usePostComment";

export default function Post() {
  const id = useParams().id as string;

  const { data: post, ...postQuery } = useGetPost(id);

  const mutation = useMutation({
    mutationFn: async (comment: string) => postComment(id, comment),
    onSuccess: () => {
      postQuery.refetch();
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const comment = formData.get("comment") as string;
    mutation.mutate(comment);
    e.currentTarget.reset();
  }

  if (postQuery.isLoading)
    return (
      <div className="post">
        <h1>Loading...</h1>
      </div>
    );

  if (postQuery.isError)
    return (
      <div className="post">
        <h1>Error</h1>
      </div>
    );

  return (
    <div className="post">
      <h1>{post?.title}</h1>
      <article>
        <p>{post?.body}</p>
      </article>
      <form onSubmit={handleSubmit} className="comment_form">
        <h2>Dodaj komentarz</h2>
        <textarea name="comment" placeholder="Twój komentarz..." required />
        <button type="submit">Dodaj komentarz</button>
      </form>
      <section className="comments">
        <h2>Komentarze</h2>
        {post?.comments && post.comments.length > 0 ? (
          <ul>
            {post.comments.map((comment) => (
              <li key={comment.id}>{comment.text}</li>
            ))}
          </ul>
        ) : (
          <p>Brak komentarzy</p>
        )}
      </section>
    </div>
  );
}
