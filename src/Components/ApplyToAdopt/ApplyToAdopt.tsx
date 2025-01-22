import "./ApplyToAdopt.css";
import { useForm } from "react-hook-form";
import { AdoptionForm } from "../../types/pet";

const AdoptionFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdoptionForm>();

  const onSubmit = (data: AdoptionForm) => {
    console.log(data);
  };

  return (
    <div className="adoption-form-container">
      {/* Replaced Card with a div and added the necessary class */}
      <div className="form-card">
        <h1 className="form-title">Apply to Adopt</h1>
        <p className="form-description">
          Please note you will not be able to submit your application until all
          fields marked as *Required are completed
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="form-fields">
          {[
            { name: "firstName", label: "First Name", required: true },
            { name: "lastName", label: "Last Name", required: true },
            { name: "telephone", label: "Telephone", required: true },
            { name: "email", label: "Email", required: true },
            { name: "address", label: "Address", required: true },
            {
              name: "otherPets",
              label: "Details of other pets in household",
              required: false,
            },
            {
              name: "petsNeutered",
              label: "If you have pets are they neutered?",
              required: true,
            },
            {
              name: "secureGarden",
              label: "Do you have a secure garden (applies to dogs only)",
              required: true,
            },
            {
              name: "animalSleepLocation",
              label: "Where will the animal sleep at night?",
              required: true,
            },
            {
              name: "workHours",
              label:
                "Please describe work hours & maximum an animal will be home alone",
              required: true,
            },
            {
              name: "previousRehoming",
              label:
                "Have you ever surrendered an animal previously for any reason?",
              required: true,
            },
            {
              name: "happyHome",
              label:
                "I agree that if adoption is a success, I will do my best to give my rescue animal the happy home they deserve",
              required: true,
            },
            {
              name: "childrenUnder16",
              label: "Is there children in the home under 16",
              required: true,
            },
            {
              name: "homeOwnership",
              label:
                "Are you a home owner or renting please state if Council, Housing Association or Private",
              required: true,
            },
            {
              name: "landlordPermission",
              label:
                "If renting does your lease state you can have pets (We will need to contact Landlord for permission)",
              required: true,
            },
            {
              name: "mainRoad",
              label: "Do you live near a main road (Applies to cats only)",
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

          <div className="checkbox-section">
            <input type="checkbox" className="checkbox-input" required />
            <label className="checkbox-label">
              Can you please check your e-mail or spam folder to reply email
              from facinme.home@gmail.com
            </label>
          </div>

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
