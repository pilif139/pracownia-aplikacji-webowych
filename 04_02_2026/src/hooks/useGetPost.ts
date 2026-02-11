import { useQuery } from "@tanstack/react-query";
import type { Post } from "./useGetPosts";

async function getPostById(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );
  const data = (await response.json()) as Post;
  return data;
}

export function useGetPost(id: string) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  });
}
