import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import axios from "axios";
import "./Blogs.css";

interface BlogPost {
  content: string;
  imageUrl: string;
}

const CLOUDINARY_CLOUD_NAME = "dhkig0hkl";
const UPLOAD_PRESET = "pet-adoption-system";

const Blogs = () => {
  const [blogPost, setBlogPost] = useState<BlogPost>({
    content: "",
    imageUrl: "",
  });
  const [approvedBlogs, setApprovedBlogs] = useState<BlogPost[]>([]); // State to store approved blogs
  const [isUploading, setIsUploading] = useState(false);

  // Fetch approved blogs on component mount
  useEffect(() => {
    const fetchApprovedBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/blogs/public"
        ); // Changed to the correct endpoint
        setApprovedBlogs(response.data); // Assuming the backend has a route that returns approved blogs
      } catch (error) {
        console.error("Error fetching approved blogs:", error);
      }
    };

    fetchApprovedBlogs();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        setBlogPost((prev) => ({
          ...prev,
          imageUrl: response.data.secure_url,
        }));
        alert("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/blogs",
        blogPost,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Blog posted successfully!");
      console.log(response.data);
      setBlogPost({ content: "", imageUrl: "" }); // Reset the form
    } catch (error: any) {
      console.error("Error posting blog:", error.response || error.message);
      alert("Failed to post blog. Please try again.");
    }
  };

  return (
    <div className="blogs-container">
      <div className="blogs-header">
        {/* Show approved blogs */}
        {approvedBlogs.length > 0 ? (
          approvedBlogs.map((blog, index) => (
            <div key={index} className="blog-card">
              <div className="blog-image-placeholder">
                <img src={blog.imageUrl} alt="Blog" className="blog-image" />
              </div>
              <p className="blog-description">{blog.content}</p>
            </div>
          ))
        ) : (
          <p>No approved blogs to display.</p>
        )}
      </div>

      <div className="blog-form-container">
        <h1 className="blog-form-title">
          Share your story about your PAWSOME Friend
        </h1>

        <div className="blog-form">
          <h2 className="blog-form-subtitle">Create a Blog</h2>

          <form onSubmit={handleSubmit} className="blog-form-fields">
            <div className="form-group">
              <label className="form-label">Write your Blog</label>
              <textarea
                className="form-textarea"
                value={blogPost.content}
                onChange={(e) =>
                  setBlogPost({ ...blogPost, content: e.target.value })
                }
                placeholder="Share your story here..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Upload an Image</label>
              <label className="form-file-upload">
                <Upload className="upload-icon" />
                <span>{isUploading ? "Uploading..." : "Choose an Image"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="form-file-input"
                  onChange={handleFileChange}
                />
              </label>
              {blogPost.imageUrl && (
                <div className="uploaded-image-preview">
                  <img
                    src={blogPost.imageUrl}
                    alt="Blog"
                    className="image-preview"
                  />
                </div>
              )}
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="form-cancel-button"
                onClick={() => setBlogPost({ content: "", imageUrl: "" })}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="form-submit-button"
                disabled={isUploading}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
