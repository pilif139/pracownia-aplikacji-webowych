import { useQuery } from "@tanstack/react-query";

export type Comment = {
  id: string;
  postId: string;
  text: string;
};

export type Post = {
  id: string;
  title: string;
  body: string;
  comments?: Comment[];
};

async function getPosts() {
  const res = await fetch("/api/posts");
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }
  const data = (await res.json()) as Post[];
  return data;
}

export function useGetPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 1000 * 60 * 1,
  });
}
