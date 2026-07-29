import { useEffect, useState } from "react";
import {
    getAllMedicines,
    addMedicine,
    updateMedicine,
    deleteMedicine
} from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

function AdminMedicines() {

    const [medicines, setMedicines] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [search, setSearch] = useState("");

    const emptyMedicine = {

        name: "",

        activeIngredient: "",

        dosage: "",

        dosageForm: "",

        manufacturer: "",

        category: "",

        description: "",

        sideEffects: ""

    };

    const [newMedicine, setNewMedicine] = useState(emptyMedicine);

    useEffect(() => {

        loadMedicines();

    }, []);

    const loadMedicines = async () => {

        try {

            const response = await getAllMedicines();

            setMedicines(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const saveMedicine = async () => {

        try {

            await addMedicine(newMedicine);

            alert("Medicine Added Successfully");

            setNewMedicine(emptyMedicine);

            loadMedicines();

        }

        catch (error) {

            console.error(error);

            alert("Unable to add medicine");

        }

    };

    const editMedicine = (medicine) => {

        setEditingId(medicine.id);

        setNewMedicine({

            name: medicine.name,

            activeIngredient: medicine.activeIngredient,

            dosage: medicine.dosage,

            dosageForm: medicine.dosageForm,

            manufacturer: medicine.manufacturer,

            category: medicine.category,

            description: medicine.description ?? "",

            sideEffects: medicine.sideEffects ?? ""

        });

    };

    const updateExistingMedicine = async () => {

        try {

            await updateMedicine(editingId, newMedicine);

            alert("Medicine Updated Successfully");

            setEditingId(null);

            setNewMedicine(emptyMedicine);

            loadMedicines();

        }

        catch (error) {

            console.error(error);

            alert("Unable to update medicine");

        }

    };

    const cancelEdit = () => {

        setEditingId(null);

        setNewMedicine(emptyMedicine);

    };

    const removeMedicine = async (id) => {

        if (!window.confirm("Delete this medicine?")) {

            return;

        }

        try {

            await deleteMedicine(id);

            alert("Medicine deleted successfully");

            loadMedicines();

        }

        catch (error) {

            console.error(error);

            alert("Unable to delete medicine");

        }

    };
    return (

        <div className="admin-container">

            <AdminSidebar />

            <div className="admin-content">

                <h1>Medicine Management</h1>

                <input

                    className="search-box"

                    placeholder="Search Medicines..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                />

                <div className="medicine-form">

                    <input
                        placeholder="Medicine Name"
                        value={newMedicine.name}
                        onChange={(e) =>
                            setNewMedicine({
                                ...newMedicine,
                                name: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Active Ingredient"
                        value={newMedicine.activeIngredient}
                        onChange={(e) =>
                            setNewMedicine({
                                ...newMedicine,
                                activeIngredient: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Dosage"
                        value={newMedicine.dosage}
                        onChange={(e) =>
                            setNewMedicine({
                                ...newMedicine,
                                dosage: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Dosage Form"
                        value={newMedicine.dosageForm}
                        onChange={(e) =>
                            setNewMedicine({
                                ...newMedicine,
                                dosageForm: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Manufacturer"
                        value={newMedicine.manufacturer}
                        onChange={(e) =>
                            setNewMedicine({
                                ...newMedicine,
                                manufacturer: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Category"
                        value={newMedicine.category}
                        onChange={(e) =>
                            setNewMedicine({
                                ...newMedicine,
                                category: e.target.value
                            })
                        }
                    />

                    {

                        editingId ? (

                            <>

                                <button
                                    onClick={updateExistingMedicine}
                                >

                                    ✏ Update Medicine

                                </button>

                                <button
                                    onClick={cancelEdit}
                                >

                                    Cancel

                                </button>

                            </>

                        ) : (

                            <button
                                onClick={saveMedicine}
                            >

                                ➕ Add Medicine

                            </button>

                        )

                    }

                </div>

                <table className="medicine-table">

                    <thead>

                    <tr>

                        <th>Name</th>

                        <th>Ingredient</th>

                        <th>Dosage</th>

                        <th>Manufacturer</th>

                        <th>Category</th>

                        <th>Actions</th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        medicines

                            .filter((medicine) => {

                                const keyword = search.toLowerCase();

                                return (

                                    medicine.name?.toLowerCase().includes(keyword) ||

                                    medicine.activeIngredient?.toLowerCase().includes(keyword) ||

                                    medicine.manufacturer?.toLowerCase().includes(keyword) ||

                                    medicine.category?.toLowerCase().includes(keyword)

                                );

                            })

                            .map((medicine) => (

                                <tr key={medicine.id}>

                                    <td>{medicine.name}</td>

                                    <td>{medicine.activeIngredient}</td>

                                    <td>{medicine.dosage}</td>

                                    <td>{medicine.manufacturer}</td>

                                    <td>{medicine.category}</td>

                                    <td>

                                        <button

                                            className="edit-btn"

                                            onClick={() =>
                                                editMedicine(medicine)
                                            }

                                        >

                                            ✏ Edit

                                        </button>

                                        <button

                                            className="delete-btn"

                                            onClick={() =>
                                                removeMedicine(medicine.id)
                                            }

                                        >

                                            🗑 Delete

                                        </button>

                                    </td>

                                </tr>

                            ))

                    }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminMedicines;