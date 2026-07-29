import { useEffect, useState } from "react";
import {
    getAllInventory,
    addInventory,
    deleteInventory,
    getAllMedicines,
    getAllPharmacies
} from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

function AdminInventory() {

    const [inventory, setInventory] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [pharmacies, setPharmacies] = useState([]);
    const [search, setSearch] = useState("");
    const [newInventory, setNewInventory] = useState({

        medicine: {
            id: ""
        },

        pharmacy: {
            id: ""
        },

        price: "",

        stock: "",

        available: true

    });

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const inventoryResponse = await getAllInventory();

            const medicineResponse = await getAllMedicines();

            const pharmacyResponse = await getAllPharmacies();

            setInventory(inventoryResponse.data);

            setMedicines(medicineResponse.data);

            setPharmacies(pharmacyResponse.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const saveInventory = async () => {

        try {

            await addInventory(newInventory);

            await loadData();

            setNewInventory({

                medicine: {
                    id: ""
                },

                pharmacy: {
                    id: ""
                },

                price: "",

                stock: "",

                available: true

            });

            alert("Inventory Added Successfully");

        }

        catch (error) {

            console.error(error);

            alert("Unable to add inventory");

        }

    };

    const removeInventory = async (id) => {

        if (!window.confirm("Delete this inventory record?")) {

            return;

        }

        try {

            await deleteInventory(id);

            loadData();

        }

        catch (error) {

            console.error(error);

            alert("Unable to delete inventory");

        }

    };
    return (

        <div className="admin-container">

            <AdminSidebar />

            <div className="admin-content">

                <h1>Inventory Management</h1>

                <input

                    className="search-box"

                    placeholder="🔍 Search by medicine or pharmacy..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                />

                <div className="medicine-form">

                    <select
                        value={newInventory.medicine.id}
                        onChange={(e) =>
                            setNewInventory({
                                ...newInventory,
                                medicine: {
                                    id: Number(e.target.value)
                                }
                            })
                        }
                    >

                        <option value="">
                            Select Medicine
                        </option>

                        {

                            medicines.map((medicine) => (

                                <option
                                    key={medicine.id}
                                    value={medicine.id}
                                >

                                    {medicine.name}

                                </option>

                            ))

                        }

                    </select>

                    <select
                        value={newInventory.pharmacy.id}
                        onChange={(e) =>
                            setNewInventory({
                                ...newInventory,
                                pharmacy: {
                                    id: Number(e.target.value)
                                }
                            })
                        }
                    >

                        <option value="">
                            Select Pharmacy
                        </option>

                        {

                            pharmacies.map((pharmacy) => (

                                <option
                                    key={pharmacy.id}
                                    value={pharmacy.id}
                                >

                                    {pharmacy.name}

                                </option>

                            ))

                        }

                    </select>

                    <input
                        type="number"
                        placeholder="Price"
                        value={newInventory.price}
                        onChange={(e) =>
                            setNewInventory({
                                ...newInventory,
                                price: e.target.value
                            })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Stock"
                        value={newInventory.stock}
                        onChange={(e) =>
                            setNewInventory({
                                ...newInventory,
                                stock: e.target.value
                            })
                        }
                    />

                    <label>

                        <input
                            type="checkbox"
                            checked={newInventory.available}
                            onChange={(e) =>
                                setNewInventory({
                                    ...newInventory,
                                    available: e.target.checked
                                })
                            }
                        />

                        Available

                    </label>

                    <button onClick={saveInventory}>

                        ➕ Add Inventory

                    </button>

                </div>

                <table className="medicine-table">

                    <thead>

                        <tr>

                            <th>Medicine</th>

                            <th>Pharmacy</th>

                            <th>Price</th>

                            <th>Stock</th>

                            <th>Available</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            inventory

                                .filter((item) => {

                                    const keyword = search.toLowerCase();

                                    return (

                                        item.medicine?.name?.toLowerCase().includes(keyword) ||

                                        item.pharmacy?.name?.toLowerCase().includes(keyword)

                                    );

                                })

                                .map((item) => (

                                <tr key={item.id}>

                                    <td>{item.medicine?.name}</td>

                                    <td>{item.pharmacy?.name}</td>

                                    <td>₹{item.price}</td>

                                    <td>{item.stock}</td>

                                    <td>

                                        {

                                            item.available

                                                ? "🟢 Yes"

                                                : "🔴 No"

                                        }

                                    </td>

                                    <td>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                removeInventory(item.id)
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

export default AdminInventory;