import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AdoptionForm {
  petId: string;
  fullName: string;
  telephone: string;
  email: string;
  address: string;
  otherPetsDetails: string;
  neuteredPets: string;
  secureGarden: string;
  animalSleepLocation: string;
  workHours: string;
  surrenderReason: string;
  adoptionAgreement: string;
  childrenUnder16: string;
  homeOwnership: string;
  leaseAllowsPets: string;
  nearMainRoad: string;
}

const AdoptionFormPage = () => {
  const navigate = useNavigate();
  const petId = useParams().id;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdoptionForm>();

  const onSubmit = async (data: AdoptionForm) => {
    try {
      const formData = { ...data, petId };
      await axios.post("http://localhost:8080/api/apply-pet", formData);
      console.log("Form submitted successfully:", formData);
      toast.success("Form submitted successfully!");
      setTimeout(() => navigate("/admin"), 2000);
    } catch (err) {
      console.error("Failed to submit form:", err);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100 py-6 px-4">
      <div className="max-w-2xl mx-auto bg-sky-100 p-8 rounded-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Apply to Adopt
        </h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          Please note you will not not be able to submit your application until all
          required fields are completed.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Form Fields with Validation */}
          {[
            {
              name: "fullName",
              label: "Full Name",
              validation: { required: "Full Name is required" },
            },
            {
              name: "telephone",
              label: "Telephone",
              validation: {
                required: "Telephone is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Telephone must be numeric",
                },
              },
            },
            {
              name: "email",
              label: "Email",
              validation: {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              },
            },
            {
              name: "address",
              label: "Address",
              validation: { required: "Address is required" },
            },
            {
              name: "otherPetsDetails",
              label: "Details of other pets in household",
              validation: {},
            },
            {
              name: "neuteredPets",
              label: "Are your pets neutered?",
              validation: { required: "This field is required" },
            },
            {
              name: "secureGarden",
              label: "Do you have a secure garden? (for dogs only)",
              validation: { required: "This field is required" },
            },
            {
              name: "animalSleepLocation",
              label: "Where will the animal sleep at night?",
              validation: { required: "This field is required" },
            },
            {
              name: "workHours",
              label: "Work hours & maximum alone time for the animal",
              validation: { required: "This field is required" },
            },
            {
              name: "surrenderReason",
              label: "Reason for surrendering any animal in the past?",
              validation: { required: "This field is required" },
            },
            {
              name: "adoptionAgreement",
              label: "I agree to provide a happy home for the adopted pet",
              validation: { required: "You must agree to adopt responsibly" },
            },
            {
              name: "childrenUnder16",
              label: "Are there children under 16 at home?",
              validation: { required: "This field is required" },
            },
            {
              name: "homeOwnership",
              label:
                "Do you own or rent your home? If renting, specify type (private/council).",
              validation: { required: "This field is required" },
            },
            {
              name: "leaseAllowsPets",
              label: "Does your lease allow pets? (for renters)",
              validation: { required: "This field is required" },
            },
            {
              name: "nearMainRoad",
              label: "Do you live near a main road? (for cats only)",
              validation: { required: "This field is required" },
            },
          ].map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {field.label} <span className="text-red-500">*</span>
              </label>
              <input
                {...register(
                  field.name as keyof AdoptionForm,
                  field.validation
                )}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors[field.name as keyof AdoptionForm] && (
                <span className="text-red-500 text-sm">
                  {errors[field.name as keyof AdoptionForm]?.message}
                </span>
              )}
            </div>
          ))}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default AdoptionFormPage;
