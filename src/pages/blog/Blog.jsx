// Blog.jsx
import HeroSection from "../../components/reusable/HeroSection";
import Seo from "../../components/reusable/Seo";
import blogImage from "../../assets/optimized/blog.webp";
import TrendingBlogCard from "./components/TrendingBlogCard";

export default function Blog() {
  return (
    <>
      <Seo 
        title="Airport Parking Blog | Tips, Guides & Travel Advice UK"
        description="Explore expert tips, airport parking guides, and travel advice to help you plan smarter and save on your journey."
        keywords={[
          "airport parking blog",
          "travel tips",
          "parking guides",
          "airport advice",
          "travel blog"
        ]}
      />
      
      <HeroSection title="Blog" breadcrumb image={blogImage} />

      <TrendingBlogCard />

      {/* <AllArticles /> */}
    </>
  );
}
