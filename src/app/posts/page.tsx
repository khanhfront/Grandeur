import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post",
  description: "See our latest posts.",
};

export default async function PostsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return (
    <>
      <h1>Danh sách bài viết</h1>
      <ul>
        {posts.map((post: { id: number; title: string }) => (
          <li key={post.id}>
            <Link className="text-hdbg" href={`/posts/${post.id}`}>
              {"->"}
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
