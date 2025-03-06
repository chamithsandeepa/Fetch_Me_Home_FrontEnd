import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface AdoptionForm {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdoptionForm>();

  const onSubmit = async (data: AdoptionForm) => {
    try {
      await axios.post("http://localhost:8080/api/apply-pet", data);
      alert("Form submitted successfully!");
      navigate("/admin"); // Redirect to the admin panel
    } catch (err) {
      console.error("Failed to submit form:", err);
      alert("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100 py-6 px-4">
      <div className="max-w-2xl mx-auto bg-sky-100 p-8 rounded-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Apply to Adopt
        </h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          Please note you will not be able to submit your application until all
          fields marked as *Required are completed
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Form Fields */}
          {[
            { name: "fullName", label: "Full Name", required: true },
            { name: "telephone", label: "Telephone", required: true },
            { name: "email", label: "Email", required: true },
            { name: "address", label: "Address", required: true },
            {
              name: "otherPetsDetails",
              label: "Details of other pets in household",
              required: false,
            },
            {
              name: "neuteredPets",
              label: "Are your pets neutered?",
              required: true,
            },
            {
              name: "secureGarden",
              label: "Do you have a secure garden? (for dogs only)",
              required: true,
            },
            {
              name: "animalSleepLocation",
              label: "Where will the animal sleep at night?",
              required: true,
            },
            {
              name: "workHours",
              label: "Work hours & maximum alone time for the animal",
              required: true,
            },
            {
              name: "surrenderReason",
              label: "Reason for surrendering any animal in the past?",
              required: true,
            },
            {
              name: "adoptionAgreement",
              label: "I agree to provide a happy home for the adopted pet",
              required: true,
            },
            {
              name: "childrenUnder16",
              label: "Are there children under 16 at home?",
              required: true,
            },
            {
              name: "homeOwnership",
              label:
                "Do you own or rent your home? If renting, specify type (private/council).",
              required: true,
            },
            {
              name: "leaseAllowsPets",
              label: "Does your lease allow pets? (for renters)",
              required: true,
            },
            {
              name: "nearMainRoad",
              label: "Do you live near a main road? (for cats only)",
              required: true,
            },
          ].map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                {...register(field.name as keyof AdoptionForm, {
                  required: field.required,
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors[field.name as keyof AdoptionForm] && (
                <span className="text-red-500 text-sm">
                  This field is required
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
    </div>
  );
};

export default AdoptionFormPage;
