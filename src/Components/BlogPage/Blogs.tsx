import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Camera } from "lucide-react";
import "./Blogs.css";

interface BlogPost {
  content: string;
  image: string | null;
}

const Blogs = () => {
  const [blogPost, setBlogPost] = useState<BlogPost>({
    content: "",
    image: null,
  });

  const isLoggedIn = false; // Replace with your actual login check logic
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      // Redirect to the registration page if not logged in
      alert("You must be logged in to post a blog.");
      navigate("/register");
      return;
    }

    console.log("Blog post submitted:", blogPost);
    // Add your submission logic here
  };

  return (
    <div className="blogs-container">
      {/* Header Section with Example Posts */}
      <div className="blogs-header">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="blog-card">
            <div className="blog-image-placeholder">
              <Camera className="blog-image-icon" size={32} />
            </div>
            <p className="blog-description">
              Discover heart-warming tales, pet care tips, and fun insights in
              our blog!
            </p>
          </div>
        ))}
      </div>

      {/* Main Blog Creation Form */}
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
              />
            </div>

            <div className="form-group">
              <label className="form-label">Upload an Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-file-input"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setBlogPost({
                        ...blogPost,
                        image: reader.result as string,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="form-cancel-button"
                onClick={() => setBlogPost({ content: "", image: null })}
              >
                Cancel
              </button>
              <button type="submit" className="form-submit-button">
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
