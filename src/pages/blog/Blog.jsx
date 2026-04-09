// Blog.jsx
import HeroSection from "../../components/reusable/HeroSection";
import Seo from "../../components/reusable/Seo";
import blogImage from "../../assets/optimized/blog.webp";
import TrendingBlogCard from "./components/TrendingBlogCard";

export default function Blog() {
  return (
    <>
      <Seo 
        title="Airport Parking Blog - Tips, Guides & Travel Advice | Go Airport Parking"
        description="Read the latest airport parking tips, travel guides, and money-saving advice. Stay updated with the best parking deals and airport travel information."
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
