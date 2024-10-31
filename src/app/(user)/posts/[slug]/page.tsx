import { slugify } from "@/utils/slugnify";

export const revalidate = 180;

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await res.json();

    return posts.map((post: { id: number; title: string }) => ({
      slug: `${slugify(post.title)}-${post.id}`,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const id = slug.split("-").pop();

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch post with id ${id}`);
    }

    const post = await res.json();

    return {
      title: post.title,
      description: post.body.slice(0, 150) + "...",
    };
  } catch (error) {
    console.error("Error fetching post metadata:", error);
    return {
      title: "Post not found",
      description: "The post could not be retrieved.",
    };
  }
}

function estimateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): string {
  const wordCount = content.trim().split(/\s+/).length;
  const readingTimeMinutes = wordCount / wordsPerMinute;
  const roundedTime = Math.ceil(readingTimeMinutes);

  return `Khoảng ${roundedTime} phút đọc`;
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const id = slug.split("-").pop();

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch post with id ${id}`);
    }

    const post = await res.json();
    const estTime = estimateReadingTime(post.body);

    const res1 = await fetch(
      `https://jsonplaceholder.typicode.com/users/${post.userId}`
    );

    if (!res1.ok) {
      throw new Error(`Failed to fetch user with id ${post.userId}`);
    }

    const user = await res1.json();

    return (
      <div>
        <h1 className="font-bold text-xl md:text-2xl flex items-center">
          <span className="mr-5">#{post.id}</span>
          {post.title}
        </h1>
        <h4 className="mb-5 text-secondary-foreground">
          Tác giả: {user.name} - {estTime}
        </h4>
        <p>{post.body}</p>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1 className="font-bold text-xl md:text-2xl">Post not found</h1>
        <p>
          Xin lỗi, bài viết bạn truy cập không tồn tại. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }
}
