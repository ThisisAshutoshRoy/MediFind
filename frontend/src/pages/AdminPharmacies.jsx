import { useEffect, useState } from "react";
import {
    getAllPharmacies,
    addPharmacy,
    updatePharmacy,
    deletePharmacy
} from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

function AdminPharmacies() {

    const [pharmacies, setPharmacies] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [search, setSearch] = useState("");

    const emptyPharmacy = {

        name: "",

        address: "",

        city: "",

        latitude: "",

        longitude: "",

        phoneNumber: "",

        email: "",

        rating: "",

        openingTime: "",

        closingTime: "",

        open24Hours: false

    };

    const [newPharmacy, setNewPharmacy] = useState(emptyPharmacy);

    useEffect(() => {

        loadPharmacies();

    }, []);

    const loadPharmacies = async () => {

        try {

            const response = await getAllPharmacies();

            setPharmacies(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const savePharmacy = async () => {

        try {

            await addPharmacy(newPharmacy);

            alert("Pharmacy Added Successfully");

            setNewPharmacy(emptyPharmacy);

            loadPharmacies();

        }

        catch (error) {

            console.error(error);

            alert("Unable to add pharmacy");

        }

    };

    const editPharmacy = (pharmacy) => {

        setEditingId(pharmacy.id);

        setNewPharmacy({

            name: pharmacy.name,

            address: pharmacy.address,

            city: pharmacy.city,

            latitude: pharmacy.latitude,

            longitude: pharmacy.longitude,

            phoneNumber: pharmacy.phoneNumber,

            email: pharmacy.email,

            rating: pharmacy.rating,

            openingTime: pharmacy.openingTime,

            closingTime: pharmacy.closingTime,

            open24Hours: pharmacy.open24Hours

        });

    };

    const updateExistingPharmacy = async () => {

        try {

            await updatePharmacy(editingId, newPharmacy);

            alert("Pharmacy Updated Successfully");

            setEditingId(null);

            setNewPharmacy(emptyPharmacy);

            loadPharmacies();

        }

        catch (error) {

            console.error(error);

            alert("Unable to update pharmacy");

        }

    };

    const cancelEdit = () => {

        setEditingId(null);

        setNewPharmacy(emptyPharmacy);

    };

    const removePharmacy = async (id) => {

        if (!window.confirm("Delete this pharmacy?")) {

            return;

        }

        try {

            await deletePharmacy(id);

            alert("Pharmacy deleted successfully");

            loadPharmacies();

        }

        catch (error) {

            console.error(error);

            alert("Unable to delete pharmacy");

        }

    };

    return (

        <div className="admin-container">

            <AdminSidebar />

            <div className="admin-content">

                <h1>Pharmacy Management</h1>

                <input

                    className="search-box"

                    placeholder="🔍 Search by name, city, address or phone..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                />

                <div className="medicine-form">

                    <input
                        placeholder="Pharmacy Name"
                        value={newPharmacy.name}
                        onChange={(e) =>
                            setNewPharmacy({
                                ...newPharmacy,
                                name: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Address"
                        value={newPharmacy.address}
                        onChange={(e) =>
                            setNewPharmacy({
                                ...newPharmacy,
                                address: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="City"
                        value={newPharmacy.city}
                        onChange={(e) =>
                            setNewPharmacy({
                                ...newPharmacy,
                                city: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Latitude"
                        value={newPharmacy.latitude}
                        onChange={(e) =>
                            setNewPharmacy({
                                ...newPharmacy,
                                latitude: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Longitude"
                        value={newPharmacy.longitude}
                        onChange={(e) =>
                            setNewPharmacy({
                                ...newPharmacy,
                                longitude: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Phone Number"
                        value={newPharmacy.phoneNumber}
                        onChange={(e) =>
                            setNewPharmacy({
                                ...newPharmacy,
                                phoneNumber: e.target.value
                            })
                        }
                    />

                    <input
                        placeholder="Email"
                        value={newPharmacy.email}
                        onChange={(e) =>
                            setNewPharmacy({
                                ...newPharmacy,
                                email: e.target.value
                            })
                        }
                    />

                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        placeholder="Rating"
                        value={newPharmacy.rating}
                        onChange={(e) =>
                            setNewPharmacy({
                                ...newPharmacy,
                                rating: e.target.value
                            })
                        }
                    />

                    <input
                        type="time"
                        value={newPharmacy.openingTime}
                        onChange={(e) =>
                            setNewPharmacy({
                                ...newPharmacy,
                                openingTime: e.target.value
                            })
                        }
                    />

                    <input
                        type="time"
                        value={newPharmacy.closingTime}
                        onChange={(e) =>
                            setNewPharmacy({
                                ...newPharmacy,
                                closingTime: e.target.value
                            })
                        }
                    />

                    <label>

                        <input

                            type="checkbox"

                            checked={newPharmacy.open24Hours}

                            onChange={(e) =>
                                setNewPharmacy({
                                    ...newPharmacy,
                                    open24Hours: e.target.checked
                                })
                            }

                        />

                        Open 24 Hours

                    </label>

                    {

                        editingId ? (

                            <>

                                <button
                                    onClick={updateExistingPharmacy}
                                >

                                    ✏ Update Pharmacy

                                </button>

                                <button
                                    onClick={cancelEdit}
                                >

                                    Cancel

                                </button>

                            </>

                        ) : (

                            <button
                                onClick={savePharmacy}
                            >

                                ➕ Add Pharmacy

                            </button>

                        )

                    }

                </div>

                <table className="medicine-table">

                    <thead>

                    <tr>

                        <th>Name</th>

                        <th>City</th>

                        <th>Rating</th>

                        <th>Phone</th>

                        <th>Maps</th>

                        <th>Actions</th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        pharmacies

                            .filter((pharmacy) => {

                                const keyword = search.toLowerCase();

                                return (

                                    pharmacy.name?.toLowerCase().includes(keyword) ||

                                    pharmacy.city?.toLowerCase().includes(keyword) ||

                                    pharmacy.address?.toLowerCase().includes(keyword) ||

                                    pharmacy.phoneNumber?.toLowerCase().includes(keyword)

                                );

                            })

                            .map((pharmacy) => (

                                <tr key={pharmacy.id}>

                                    <td>{pharmacy.name}</td>

                                    <td>{pharmacy.city}</td>

                                    <td>{pharmacy.rating}</td>

                                    <td>{pharmacy.phoneNumber}</td>

                                    <td>

                                        <a

                                            href={`https://www.google.com/maps/search/?api=1&query=${pharmacy.latitude},${pharmacy.longitude}`}

                                            target="_blank"

                                            rel="noreferrer"

                                        >

                                            🗺 Open

                                        </a>

                                    </td>

                                    <td>

                                        <button

                                            className="edit-btn"

                                            onClick={() =>
                                                editPharmacy(pharmacy)
                                            }

                                        >

                                            ✏ Edit

                                        </button>

                                        <button

                                            className="delete-btn"

                                            onClick={() =>
                                                removePharmacy(pharmacy.id)
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

export default AdminPharmacies;