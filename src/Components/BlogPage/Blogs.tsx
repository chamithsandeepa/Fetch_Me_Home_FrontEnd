import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import axios from "axios";

const CLOUDINARY_CLOUD_NAME = "dhkig0hkl";
const UPLOAD_PRESET = "pet-adoption-system";

interface BlogPost {
  content: string;
  imageUrl: string;
}

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
    const role = localStorage.getItem("role");
    if (role === "user") {
      //   navigate(role === "admin" ? "/admin" : "/");

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
    } else {
      alert("You need to be logged in to post a blog.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-sky-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Share Your Pawsome Story
        </h1>
        <p className="text-xl text-gray-600">
          Join our community by sharing your wonderful experience with pets!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {approvedBlogs.length > 0 ? (
          approvedBlogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <div className="h-56 bg-gray-200">
                <img
                  src={blog.imageUrl}
                  alt="Blog"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-base">{blog.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-3">
            No approved blogs to display.
          </p>
        )}
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Create Your Blog
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Write Your Blog
            </label>
            <textarea
              id="content"
              className="mt-2 p-4 w-full rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={blogPost.content}
              onChange={(e) =>
                setBlogPost({ ...blogPost, content: e.target.value })
              }
              placeholder="Share your story here..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload an Image
            </label>
            <label
              htmlFor="file-upload"
              className="inline-flex items-center cursor-pointer text-indigo-600 hover:text-indigo-700 mt-4"
            >
              <Upload className="w-6 h-6 mr-2" />
              <span>{isUploading ? "Uploading..." : "Choose an Image"}</span>
              <input
                type="file"
                accept="image/*"
                id="file-upload"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
            {blogPost.imageUrl && (
              <div className="mt-4">
                <img
                  src={blogPost.imageUrl}
                  alt="Uploaded Preview"
                  className="w-full rounded-lg shadow-md max-h-72 object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-200 px-6 py-2 rounded-lg text-gray-700 hover:bg-gray-300"
              onClick={() => setBlogPost({ content: "", imageUrl: "" })}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              disabled={isUploading}
            >
              Post Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Blogs;
