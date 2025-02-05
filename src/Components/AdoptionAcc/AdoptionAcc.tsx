import { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";
import axios from "axios";
import "./AdoptionAcc.css";
import { AdoptionForm } from "../../types/adoptionform";

const AdminPanel = () => {
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
    <div className="admin-panel">
      <div className="container">
        <h1 className="title">Adoption Applications</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Pet Details</th>
                <th>Housing</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr key={form.id}>
                  <td>{form.id || "N/A"}</td>
                  <td>
                    {editingForms.has(form.id) ? (
                      <input
                        type="text"
                        value={editedFormsData.get(form.id)?.fullName || ""}
                        onChange={(e) =>
                          handleInputChange(form.id, "fullName", e.target.value)
                        }
                      />
                    ) : (
                      form.fullName || "N/A"
                    )}
                  </td>
                  <td>
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
                        />
                        <input
                          type="email"
                          value={editedFormsData.get(form.id)?.email || ""}
                          onChange={(e) =>
                            handleInputChange(form.id, "email", e.target.value)
                          }
                        />
                      </>
                    ) : (
                      <>
                        <div>{form.telephone || "N/A"}</div>
                        <div>{form.email || "N/A"}</div>
                      </>
                    )}
                  </td>
                  <td>{form.address || "N/A"}</td>
                  <td>
                    <details>
                      <summary>View Details</summary>
                      <div>Other Pets: {form.otherPetsDetails || "N/A"}</div>
                      <div>Neutered: {form.neuteredPets || "N/A"}</div>
                      <div>Garden: {form.secureGarden || "N/A"}</div>
                      <div>
                        Sleep Location: {form.animalSleepLocation || "N/A"}
                      </div>
                    </details>
                  </td>
                  <td>
                    <details>
                      <summary>View Housing</summary>
                      <div>Children: {form.childrenUnder16 || "N/A"}</div>
                      <div>Ownership: {form.homeOwnership || "N/A"}</div>
                      <div>
                        Lease Allows Pets: {form.leaseAllowsPets || "N/A"}
                      </div>
                      <div>Near Main Road: {form.nearMainRoad || "N/A"}</div>
                    </details>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEditClick(form)}
                      className="edit-btn"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => removeForm(form.id)}
                      className="delete-btn"
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
          <button onClick={saveAllChanges} className="save-btn">
            Save All Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
