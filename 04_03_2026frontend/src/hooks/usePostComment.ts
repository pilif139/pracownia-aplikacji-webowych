export default async function postComment(postId: string, comment: string) {
  const res = await fetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: comment }),
  });
  if (!res.ok) {
    throw new Error(`Failed to post comment: ${res.status}`);
  }
  return res.json();
}
