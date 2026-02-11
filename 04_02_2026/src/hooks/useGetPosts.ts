import { useQuery } from "@tanstack/react-query";

export type Post = {
  userId: string;
  id: number;
  title: string;
  body: string;
};

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
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
