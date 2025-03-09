import { useEffect, useState } from "react";
import { Trash2, CheckCircle } from "lucide-react";
import axios from "axios";
import { AdoptionForm } from "../../types/adoptionform";

const AdoptionAcc = () => {
  const [forms, setForms] = useState<AdoptionForm[]>([]);
  const [petNames, setPetNames] = useState<{ [key: string]: string }>({}); // Store pet names by petId
  const [error, setError] = useState<string | null>(null);
  const [adoptedMessage, setAdoptedMessage] = useState<string | null>(null);

  const fetchForms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/apply-pet");
      const userForms = response.data;
      console.log(response.data, "Test receiving data");
      setForms(userForms);
      setError(null);

      // Fetch pet names for each form
      userForms.forEach((form: AdoptionForm) => {
        fetchPetName(form.petId);
      });
    } catch (err) {
      console.error("Failed to fetch forms:", err);
      setError("Error fetching forms. Please try again later.");
    }
  };

  const fetchPetName = async (petId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/pets/${petId}`
      );
      setPetNames((prev) => ({
        ...prev,
        [petId]: response.data.name, // Store pet name by petId
      }));
    } catch (err) {
      console.error("Failed to fetch pet name:", err);
      setPetNames((prev) => ({
        ...prev,
        [petId]: "Unknown", // Fallback if pet name cannot be fetched
      }));
    }
  };

  const removeForm = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/apply-pet/${id}`);
      setForms((prev) => prev.filter((form) => form.id !== id));
      setError(null);
    } catch (err) {
      console.error("Failed to remove form:", err);
      setError("Error removing the form. Please try again.");
    }
  };

  const updateAdaptStatus = async (id: string) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/pets/${id}`,
        true,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data, "Test receiving data");
      setForms((prev) =>
        prev.map((form) => (form.id === id ? { ...form, adopted: true } : form))
      );
      setError(null);
      setAdoptedMessage("This pet has been adopted!");
      setTimeout(() => setAdoptedMessage(null), 3000);
    } catch (err) {
      console.error("Failed to update form:", err);
      setError("Error updating the form. Please try again.");
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-screen-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Adoption Applications
        </h1>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        {adoptedMessage && (
          <div className="text-green-500 text-center mb-4">
            {adoptedMessage}
          </div>
        )}

        <div className="overflow-auto">
          <table className="min-w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead className="bg-blue-700 text-white sticky top-0 z-10">
              <tr>
                {[
                  "Pet Name", // New column for pet name
                  "ID",
                  "Pet ID",
                  "Full Name",
                  "Telephone",
                  "Email",
                  "Address",
                  "Other Pets",
                  "Neutered",
                  "Garden",
                  "Sleep Location",
                  "Work Hours",
                  "Surrender Reason",
                  "Agreement",
                  "Children",
                  "Home Ownership",
                  "Lease",
                  "Near Road",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="py-4 px-6 text-left text-sm font-semibold uppercase border-b"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr
                  key={form.id}
                  className="border-b hover:bg-gray-100 text-sm"
                >
                  {/* Pet Name Column */}
                  <td className="py-4 px-6">
                    {petNames[form.petId] || "Loading..."}
                  </td>

                  {/* Rest of the columns */}
                  {Object.entries(form).map(
                    ([key, value]) =>
                      key !== "otherPets" &&
                      key !== "isAdopted" && (
                        <td key={key} className="py-4 px-6">
                          {value || "N/A"}
                        </td>
                      )
                  )}
                  <td className="py-4 px-6 flex justify-center gap-2">
                    <button
                      onClick={() => updateAdaptStatus(form.petId)}
                      className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-all"
                    >
                      <CheckCircle size={16} />
                    </button>
                    <button
                      onClick={() => removeForm(form.id)}
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdoptionAcc;
