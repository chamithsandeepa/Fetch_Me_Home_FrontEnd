import "./ApplyToAdopt.css";
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
    <div className="adoption-form-container">
      <div className="form-card">
        <h1 className="form-title">Apply to Adopt</h1>
        <p className="form-description">
          Please note you will not be able to submit your application until all
          fields marked as *Required are completed
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="form-fields">
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
            <div key={field.name} className="form-field">
              <label className="form-label">
                {field.label}
                {field.required && <span className="required">*</span>}
              </label>
              <input
                {...register(field.name as keyof AdoptionForm, {
                  required: field.required,
                })}
                className="form-input"
              />
              {errors[field.name as keyof AdoptionForm] && (
                <span className="error-message">This field is required</span>
              )}
            </div>
          ))}

          <div className="form-actions">
            <button type="button" className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptionFormPage;
