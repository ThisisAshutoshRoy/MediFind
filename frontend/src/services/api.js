import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api"
});

// Automatically attach JWT token
API.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);

// ====================================
// Medicine Search APIs
// ====================================

export const searchMedicine = (name) => {
    return API.get(`/medicines/search?name=${encodeURIComponent(name)}`);
};

export const getBestAlternative = (name) => {
    return API.get(`/medicines/best-alternative?name=${encodeURIComponent(name)}`);
};

export const compareMedicine = (name) => {
    return API.get(`/medicines/compare?name=${encodeURIComponent(name)}`);
};

export const getRecommendations = (name) => {
    return API.get(`/medicines/recommend?name=${encodeURIComponent(name)}`);
};

export const compareTwoMedicines = (medicine1, medicine2) => {
    return API.get(
        `/medicines/compare-two?medicine1=${encodeURIComponent(medicine1)}&medicine2=${encodeURIComponent(medicine2)}`
    );
};

export const getMedicineNames = () => {
    return API.get("/medicines/names");
};

export const getPharmacies = (name) => {
    return API.get(
        `/medicines/pharmacies?name=${encodeURIComponent(name)}`
    );
};

// ====================================
// Dashboard
// ====================================

export const getDashboardStats = () => {
    return API.get("/medicines/dashboard");
};

// ====================================
// Admin Medicine APIs
// ====================================

export const getAllMedicines = () => {
    return API.get("/medicines/all");
};

export const addMedicine = (medicine) => {
    return API.post("/medicines", medicine);
};

export const updateMedicine = (id, medicine) => {
    return API.put(`/medicines/${id}`, medicine);
};

export const deleteMedicine = (id) => {
    return API.delete(`/medicines/${id}`);
};

// ====================================
// Admin Pharmacy APIs
// ====================================

export const getAllPharmacies = () => {
    return API.get("/pharmacies");
};

export const addPharmacy = (pharmacy) => {
    return API.post("/pharmacies", pharmacy);
};

export const updatePharmacy = (id, pharmacy) => {
    return API.put(`/pharmacies/${id}`, pharmacy);
};

export const deletePharmacy = (id) => {
    return API.delete(`/pharmacies/${id}`);
};

// ====================================
// Admin Inventory APIs
// ====================================

export const getAllInventory = () => {
    return API.get("/inventory");
};

export const addInventory = (inventory) => {
    return API.post("/inventory", inventory);
};

export const updateInventory = (id, inventory) => {
    return API.put(`/inventory/${id}`, inventory);
};

export const deleteInventory = (id) => {
    return API.delete(`/inventory/${id}`);
};

export default API;