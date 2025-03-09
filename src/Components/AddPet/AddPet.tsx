import React, { useState } from "react";
import axios from "axios";
import { Pet } from "../../types/pet";
import { Upload } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    adopted: false,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // Validate while typing
    if (name === "age" && (!/^\d+$/.test(value) || Number(value) <= 0)) {
      setErrors((prev) => ({
        ...prev,
        age: "Age must be a valid positive number.",
      }));
    } else if (name === "contactNo" && !/^\d{10}$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        contactNo: "Contact number must be 10 digits.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!formData.species) newErrors.species = "Species is required.";
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.breed.trim()) newErrors.breed = "Breed is required.";
    if (!formData.sex) newErrors.sex = "Sex is required.";
    if (
      !formData.age ||
      isNaN(Number(formData.age)) ||
      Number(formData.age) <= 0
    )
      newErrors.age = "Age must be a valid positive number.";
    if (!formData.color.trim()) newErrors.color = "Color is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.contactNo || !/^\d{10}$/.test(formData.contactNo))
      newErrors.contactNo = "Contact number must be 10 digits.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!uploadedImage) newErrors.imageUrl = "Image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        setFormData((prev) => ({ ...prev, imageUrl: imageUrl }));
        setErrors((prev) => ({ ...prev, imageUrl: "" }));
        toast.success("Image uploaded successfully!");
      } catch (error) {
        toast.error("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) {
      toast.warning("Please wait for the image to finish uploading.");
      return;
    }
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/pets", formData, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Pet Added Successfully!");
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
        adopted: false,
      });
      setUploadedImage(null);
      setErrors({});
    } catch {
      toast.error("Failed to add pet. Please try again.");
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
          >
            <option value="" disabled>
              Select Species
            </option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
          {errors.species && (
            <p className="text-red-500 text-sm">{errors.species}</p>
          )}

          {[
            "name",
            "breed",
            "sex",
            "age",
            "color",
            "location",
            "contactNo",
          ].map((field) => (
            <div key={field}>
              <input
                type={field === "age" ? "number" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={(formData as any)[field]}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              {errors[field] && (
                <p className="text-red-500 text-sm">{errors[field]}</p>
              )}
            </div>
          ))}

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}

          <div className="flex flex-col items-center border-2 border-dashed border-gray-400 p-4 rounded-lg hover:bg-purple-50 transition">
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
          {errors.imageUrl && (
            <p className="text-red-500 text-sm">{errors.imageUrl}</p>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddPetForm;
