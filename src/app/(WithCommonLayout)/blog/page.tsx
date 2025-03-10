"use client";
import Image from "next/image";
import { useState } from "react";

const blogs = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    date: "March 10, 2025",
    category: "Technology",
    image: "/images/ai-web.jpg",
    excerpt: "Exploring how AI is revolutionizing web development...",
  },
  {
    id: 2,
    title: "10 Best Places to Visit in Bangladesh",
    date: "March 8, 2025",
    category: "Travel",
    image: "/images/bd-travel.jpg",
    excerpt: "Discover the must-visit places in Bangladesh...",
  },
  {
    id: 3,
    title: "Mastering Tailwind CSS",
    date: "March 5, 2025",
    category: "Technology",
    image: "/images/tailwind.jpg",
    excerpt: "A comprehensive guide to using Tailwind CSS effectively...",
  },
];

const categories = ["All", "Technology", "Travel"];

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <Image
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
              width={300}
              height={200}
            />
            <div className="p-5 bg-white">
              <h2 className="text-lg font-semibold text-blue-700">
                {blog.title}
              </h2>
              <p className="text-gray-500 text-sm">{blog.date}</p>
              <p className="mt-2 text-gray-700">{blog.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
