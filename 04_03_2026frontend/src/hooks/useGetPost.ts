import { useQuery } from "@tanstack/react-query";
import type { Post } from "./useGetPosts";

async function getPostById(id: string) {
  const response = await fetch(`/api/posts/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch post ${id}: ${response.status}`);
  }
  const data = (await response.json()) as Post;
  return data;
}

export function useGetPost(id: string) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  });
}
