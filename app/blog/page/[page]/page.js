// app/blog/page/[page]/page.js
import Controls from "@/components/blog/controls";
import { notFound } from 'next/navigation';

// Two arrays of blog posts
const blogPosts1 = [
  "Introduction to JavaScript",
  "Understanding React Basics",
  "A Guide to Next.js Features",
  "Exploring the Node.js Ecosystem",
  "CSS Grid vs Flexbox: A Comparison",
  "Top 10 JavaScript Libraries in 2024",
  "Building Responsive Layouts with Tailwind CSS",
  "How to Optimize Your Web Performance",
  "Getting Started with TypeScript",
  "Essential Git Commands for Developers"
];

const blogPosts2 = [
  "Best Practices for RESTful APIs",
  "GraphQL vs REST: Which to Choose?",
  "Understanding Asynchronous JavaScript",
  "Building a Simple CRUD App with Express",
  "A Beginner’s Guide to Docker",
  "How to Set Up Continuous Integration",
  "Debugging Techniques for Frontend Developers",
  "Introduction to Progressive Web Apps",
  "Creating Accessible Web Applications",
  "Exploring Serverless Architectures"
];

// Combine the arrays
const blogPosts = [...blogPosts1, ...blogPosts2];

export default function BlogPage({ params }) {
  const currentPage = parseInt(params.page, 10);
  const postsPerPage = 5;

  // Calculate total number of pages
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  // Check if current page is out of range
  if (currentPage < 1 || currentPage > totalPages) {
    // Redirect to the last valid page or show a 404 page
    // notFound(); // or router.push(`/blog/page/${totalPages}`);
  }

  // Get the posts for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <h1>Blog Posts - Page {currentPage}</h1>
      <ul>
        {currentPosts.map((post, index) => (
          <li key={index}>{post}</li>
        ))}
      </ul>

      <Controls currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

// Generate static paths for each blog page
export async function generateStaticParams() {
    const totalPosts = blogPosts.length;
    const postsPerPage = 5;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
  
    // Limit to a specific range of pages (e.g., only pages 1 to 4)
    const maxPagesToGenerate = Math.min(totalPages, 4); // Adjust the limit as needed
  
    // Generate static paths for pages 1 to maxPagesToGenerate
    const paths = Array.from({ length: maxPagesToGenerate }, (_, i) => ({
      page: `${i + 1}`, // Creates URLs like `/blog/page/1`, `/blog/page/2`, etc.
    }));
  
    return paths;
  }

// Optional: Generate metadata for each page (helps SEO)
export function generateMetadata({ params }) {
  return {
    title: `Blog - Page ${params.page}`,
    description: `This is page ${params.page} of the blog`,
  };
}
