import React from 'react';
import bgImage from "../assets/heroimg.jpg";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Modern Furniture Trends 2024",
      category: "Furniture",
      date: "January 15, 2024",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3",
      excerpt: "Discover the latest trends in modern furniture design and how to incorporate them into your home."
    },
    {
      id: 2,
      title: "Creating a Cozy Living Space",
      category: "Interior Design",
      date: "January 12, 2024",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3",
      excerpt: "Learn how to transform your living room into a comfortable and inviting space."
    },
    // Add more blog posts here
  ];

  return (
    <div className="bg-[#f9f5f0] min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[330px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl">
            <span className="hover:text-gray-600 cursor-pointer">Home</span>
            <span className="mx-2">&gt;</span>
            <span className="font-semibold">Blog</span>
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-500 mb-2">{post.date}</p>
                <h2 className="text-2xl font-bold mb-3 hover:text-gray-700 cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <button className="text-black font-semibold hover:text-gray-700">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
