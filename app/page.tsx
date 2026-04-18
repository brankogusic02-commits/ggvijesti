import { getAllPosts } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import { HomeFeed } from "@/components/HomeFeed";
import { Hero } from "@/components/Hero";

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <>
      <Hero />
      <HomeFeed posts={posts} categories={CATEGORIES} />
    </>
  );
}
