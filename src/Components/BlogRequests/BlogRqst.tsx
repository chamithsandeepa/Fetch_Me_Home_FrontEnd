import { useEffect, useState } from "react";
import { Trash2, CheckCircle } from "lucide-react";
import axios from "axios";

interface Blog {
  id: string;
  content: string;
  imageUrl: string;
  approved: boolean;
  createdAt: string;
}

const BlogRequestPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // Fetch all blogs (approved + pending)
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/blogs/admin");
      setBlogs(response.data);
      console.log("Fetched blogs:", response.data); // Debugging log
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  // Approve blog post
  const approveBlog = async (id: string) => {
    try {
      await axios.put(`http://localhost:8080/api/blogs/approve/${id}`);
      setBlogs((prev) =>
        prev.map((blog) =>
          blog.id === id ? { ...blog, approved: true } : blog
        )
      );
    } catch (err) {
      console.error("Failed to approve blog:", err);
    }
  };

  // Remove blog post
  const removeBlog = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (err) {
      console.error("Failed to remove blog:", err);
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-b from-[#f3e8ff] to-[#e0f2fe] py-8">
      <div className="w-4/5 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          All Blog Posts
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="p-4 bg-[#007bff] text-white">Blog ID</th>
                <th className="p-4 bg-[#007bff] text-white">Content</th>
                <th className="p-4 bg-[#007bff] text-white">Image</th>
                <th className="p-4 bg-[#007bff] text-white">Status</th>
                <th className="p-4 bg-[#007bff] text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <tr key={blog.id} className="border-b">
                    <td className="text-center p-4">{blog.id}</td>
                    <td className="p-4">{blog.content}</td>
                    <td className="p-4">
                      {blog.imageUrl ? (
                        <img
                          src={blog.imageUrl}
                          alt="Blog"
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td
                      className={`p-4 text-center ${
                        blog.approved ? "text-green-500" : "text-yellow-500"
                      }`}
                    >
                      {blog.approved ? "Approved" : "Pending"}
                    </td>
                    <td className="p-4 flex gap-2 justify-center">
                      {!blog.approved && (
                        <button
                          onClick={() => approveBlog(blog.id)}
                          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => removeBlog(blog.id)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-500">
                    No blogs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogRequestPage;
