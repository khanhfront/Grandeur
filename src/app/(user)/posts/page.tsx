import Link from "next/link";
import { Metadata } from "next";
import { slugify } from "@/utils/slugnify";

export const metadata: Metadata = {
  title: "Post",
  description:
    "See our latest posts about trips, travels, tips and tricks to find a stunning property.",
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
            <Link
              className="text-hdbg"
              href={`/posts/${slugify(post.title)}-${post.id}`}
            >
              {"->"}
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
