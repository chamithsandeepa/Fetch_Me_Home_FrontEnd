import { useEffect, useState } from "react";
import { Trash2, CheckCircle } from "lucide-react";
import axios from "axios";
import "./BlogRqst.css";

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
    <div className="blog-page">
      <div className="blog-container">
        <h1 className="blog-title">All Blog Posts</h1>
        <div className="blog-table-wrapper">
          <table className="blog-table">
            <thead>
              <tr>
                <th>Blog ID</th>
                <th>Content</th>
                <th>Image</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td className="center">{blog.id}</td>
                    <td>{blog.content}</td>
                    <td>
                      {blog.imageUrl ? (
                        <img
                          src={blog.imageUrl}
                          alt="Blog"
                          className="blog-img"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td
                      className={`status ${
                        blog.approved ? "approved" : "pending"
                      }`}
                    >
                      {blog.approved ? "Approved" : "Pending"}
                    </td>
                    <td className="blog-action-cell">
                      {!blog.approved && (
                        <button
                          onClick={() => approveBlog(blog.id)}
                          className="blog-btn approve-btn"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => removeBlog(blog.id)}
                        className="blog-btn delete-btn"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="center">
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
