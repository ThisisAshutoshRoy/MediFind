import "./App.css";

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Recommendations from "./pages/Recommendations";
import Compare from "./pages/Compare";
import Pharmacies from "./pages/Pharmacies";
import About from "./pages/About";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMedicines from "./pages/AdminMedicines";
import AdminPharmacies from "./pages/AdminPharmacies";
import AdminInventory from "./pages/AdminInventory";

function App() {

    return (

        <>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/recommendations"
                    element={<Recommendations />}
                />

                <Route
                    path="/compare"
                    element={<Compare />}
                />

                <Route
                    path="/pharmacies"
                    element={<Pharmacies />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/medicines"
                    element={
                        <ProtectedRoute>
                            <AdminMedicines />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/pharmacies"
                    element={
                        <ProtectedRoute>
                            <AdminPharmacies />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/inventory"
                    element={
                        <ProtectedRoute>
                            <AdminInventory />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

            <Footer />

        </>

    );

}

export default App;