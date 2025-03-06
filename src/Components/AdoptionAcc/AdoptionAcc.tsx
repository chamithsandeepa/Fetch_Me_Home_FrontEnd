import { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";
import axios from "axios";
import { AdoptionForm } from "../../types/adoptionform";

const AdoptionAcc = () => {
  const [forms, setForms] = useState<AdoptionForm[]>([]);
  const [editingForms, setEditingForms] = useState<Set<string>>(new Set());
  const [editedFormsData, setEditedFormsData] = useState<
    Map<string, Partial<AdoptionForm>>
  >(new Map());
  const [error, setError] = useState<string | null>(null);

  // Fetch forms from API
  const fetchForms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/apply-pet");
      setForms(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch forms:", err);
      setError("Error fetching forms. Please try again later.");
    }
  };

  // Remove a form by ID
  const removeForm = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/apply-pet/${id}`);
      setForms((prev) => prev.filter((form) => form.id !== id));
      setEditedFormsData((prev) => {
        const updated = new Map(prev);
        updated.delete(id);
        return updated;
      });
      setEditingForms((prev) => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
      setError(null);
    } catch (err) {
      console.error("Failed to remove form:", err);
      setError("Error removing the form. Please try again.");
    }
  };

  // Start editing a form
  const handleEditClick = (form: AdoptionForm) => {
    setEditingForms((prev) => new Set(prev).add(form.id));
    setEditedFormsData((prev) => {
      const updated = new Map(prev);
      updated.set(form.id, { ...form });
      return updated;
    });
  };

  // Handle input changes for edited forms
  const handleInputChange = (
    id: string,
    field: keyof AdoptionForm,
    value: string
  ) => {
    setEditedFormsData((prev) => {
      const updated = new Map(prev);
      const form = updated.get(id) || {};
      form[field] = value;
      updated.set(id, form);
      return updated;
    });
  };

  // Save all changes to the server
  const saveAllChanges = async () => {
    try {
      await Promise.all(
        Array.from(editedFormsData.values()).map((formData) =>
          axios.put(
            `http://localhost:8080/api/apply-pet/${formData.id}`,
            formData
          )
        )
      );
      fetchForms();
      setEditingForms(new Set());
      setEditedFormsData(new Map());
      setError(null);
    } catch (err) {
      console.error("Failed to save changes:", err);
      setError("Error saving changes. Please try again.");
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-blue-50 to-white py-8">
      <div className="max-w-screen-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">
          Adoption Applications
        </h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Contact</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Pet Details</th>
                <th className="py-3 px-6 text-left">Housing</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr key={form.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{form.id || "N/A"}</td>
                  <td className="py-3 px-6">
                    {editingForms.has(form.id) ? (
                      <input
                        type="text"
                        value={editedFormsData.get(form.id)?.fullName || ""}
                        onChange={(e) =>
                          handleInputChange(form.id, "fullName", e.target.value)
                        }
                        className="border rounded-md p-2 w-full"
                      />
                    ) : (
                      form.fullName || "N/A"
                    )}
                  </td>
                  <td className="py-3 px-6">
                    {editingForms.has(form.id) ? (
                      <>
                        <input
                          type="text"
                          value={editedFormsData.get(form.id)?.telephone || ""}
                          onChange={(e) =>
                            handleInputChange(
                              form.id,
                              "telephone",
                              e.target.value
                            )
                          }
                          className="border rounded-md p-2 w-full mb-2"
                        />
                        <input
                          type="email"
                          value={editedFormsData.get(form.id)?.email || ""}
                          onChange={(e) =>
                            handleInputChange(form.id, "email", e.target.value)
                          }
                          className="border rounded-md p-2 w-full"
                        />
                      </>
                    ) : (
                      <>
                        <div>{form.telephone || "N/A"}</div>
                        <div>{form.email || "N/A"}</div>
                      </>
                    )}
                  </td>
                  <td className="py-3 px-6">{form.address || "N/A"}</td>
                  <td className="py-3 px-6">
                    <details className="cursor-pointer">
                      <summary className="text-blue-600">View Details</summary>
                      <div>Other Pets: {form.otherPetsDetails || "N/A"}</div>
                      <div>Neutered: {form.neuteredPets || "N/A"}</div>
                      <div>Garden: {form.secureGarden || "N/A"}</div>
                      <div>
                        Sleep Location: {form.animalSleepLocation || "N/A"}
                      </div>
                    </details>
                  </td>
                  <td className="py-3 px-6">
                    <details className="cursor-pointer">
                      <summary className="text-blue-600">View Housing</summary>
                      <div>Children: {form.childrenUnder16 || "N/A"}</div>
                      <div>Ownership: {form.homeOwnership || "N/A"}</div>
                      <div>
                        Lease Allows Pets: {form.leaseAllowsPets || "N/A"}
                      </div>
                      <div>Near Main Road: {form.nearMainRoad || "N/A"}</div>
                    </details>
                  </td>
                  <td className="py-3 px-6 flex space-x-2">
                    <button
                      onClick={() => handleEditClick(form)}
                      className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-all"
                    >
                      <Edit size={16} />
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
        {editedFormsData.size > 0 && (
          <button
            onClick={saveAllChanges}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            Save All Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default AdoptionAcc;
