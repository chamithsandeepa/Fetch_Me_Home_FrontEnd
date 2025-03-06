import React, { useState } from "react";
import axios from "axios";
import { Pet } from "../../types/pet";
import { Upload } from "lucide-react";

const CLOUDINARY_CLOUD_NAME = "dhkig0hkl";
const UPLOAD_PRESET = "pet-adoption-system";

const AddPetForm = () => {
  const [formData, setFormData] = useState<Omit<Pet, "id">>({
    species: "",
    name: "",
    breed: "",
    sex: "",
    age: "",
    color: "",
    location: "",
    contactNo: "",
    description: "",
    imageUrl: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

        const imageUrl = response.data.secure_url;
        setUploadedImage(imageUrl);
        setFormData((prev) => ({
          ...prev,
          imageUrl: imageUrl,
        }));
      } catch (error) {
        alert("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) {
      alert("Please wait for the image to finish uploading.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/pets", formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Pet added successfully!");
      setFormData({
        species: "",
        name: "",
        breed: "",
        sex: "",
        age: "",
        color: "",
        location: "",
        contactNo: "",
        description: "",
        imageUrl: "",
      });
      setUploadedImage(null);
    } catch {
      alert("Failed to add pet. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-200 to-blue-200 p-6">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4 uppercase tracking-wide">
          Add a Pet
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="species"
            value={formData.species}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="" disabled>
              Select Species
            </option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
          {[
            "name",
            "breed",
            "sex",
            "age",
            "color",
            "location",
            "contactNo",
          ].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={(formData as any)[field]}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
          ))}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded-lg hover:bg-purple-50 transition">
            <label className="cursor-pointer flex flex-col items-center text-gray-500">
              <Upload className="w-8 h-8" />
              <span>
                {isUploading
                  ? "Uploading..."
                  : uploadedImage
                  ? "Image uploaded"
                  : "Upload an image"}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                required={!uploadedImage}
              />
            </label>
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Preview"
                className="mt-2 w-24 h-24 object-cover rounded-lg"
              />
            )}
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetForm;
