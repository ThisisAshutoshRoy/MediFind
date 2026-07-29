import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardStats } from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

function AdminDashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({

        medicines: 0,

        pharmacies: 0,

        inventory: 0,

        admins: 0,

        availableInventory: 0,

        outOfStock: 0,

        lowStock: 0,

        averagePrice: 0

    });

    useEffect(() => {

        loadStats();

    }, []);

    const loadStats = async () => {

        try {

            const response = await getDashboardStats();

            setStats(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };

    return (

        <div className="admin-container">

            <AdminSidebar />

            <div className="admin-content">

                <div className="dashboard-header">

                    <h1>MediFind Admin Dashboard</h1>

                    <button onClick={logout}>

                        Logout

                    </button>

                </div>

                <div className="dashboard-cards">

                    <div className="dashboard-card">

                        <h2>💊 Medicines</h2>

                        <h1>{stats.medicines}</h1>

                    </div>

                    <div className="dashboard-card">

                        <h2>🏥 Pharmacies</h2>

                        <h1>{stats.pharmacies}</h1>

                    </div>

                    <div className="dashboard-card">

                        <h2>📦 Inventory</h2>

                        <h1>{stats.inventory}</h1>

                    </div>

                    <div className="dashboard-card">

                        <h2>👤 Admin Users</h2>

                        <h1>{stats.admins}</h1>

                    </div>

                    <div className="dashboard-card">

                        <h2>🟢 Available Inventory</h2>

                        <h1>{stats.availableInventory}</h1>

                    </div>

                    <div className="dashboard-card">

                        <h2>🔴 Out of Stock</h2>

                        <h1>{stats.outOfStock}</h1>

                    </div>

                    <div className="dashboard-card">

                        <h2>⚠ Low Stock</h2>

                        <h1>{stats.lowStock}</h1>

                    </div>

                    <div className="dashboard-card">

                        <h2>💰 Average Price</h2>

                        <h1>₹{stats.averagePrice}</h1>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;