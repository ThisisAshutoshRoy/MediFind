import { useEffect, useState } from "react";

import MedicineSearch from "../components/MedicineSearch";
import PharmacyCard from "../components/PharmacyCard";
import PharmacyMap from "../components/PharmacyMap";

import { calculateDistance } from "../utils/distance";
import { getPharmacies } from "../services/api";

function Pharmacies() {

    const [pharmacies, setPharmacies] = useState([]);

    const [sortBy, setSortBy] = useState("distance");

    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(

                (position) => {

                    setUserLocation({

                        latitude: position.coords.latitude,

                        longitude: position.coords.longitude

                    });

                },

                (error) => {

                    console.error(error);

                    alert("Location permission denied. Distance cannot be calculated.");

                }

            );

        }

    }, []);

    const handleSearch = async (medicineName) => {

        try {

            const response = await getPharmacies(medicineName);

            setPharmacies(response.data);

        }

        catch (error) {

            console.error(error);

            alert("No pharmacies found.");

            setPharmacies([]);

        }

    };

    const sortedPharmacies = [...pharmacies].sort((a, b) => {

        if (sortBy === "price") {

            return a.price - b.price;

        }

        if (sortBy === "rating") {

            return (b.rating ?? 0) - (a.rating ?? 0);

        }

        if (sortBy === "distance" && userLocation) {

            const distanceA = calculateDistance(

                userLocation.latitude,

                userLocation.longitude,

                a.latitude,

                a.longitude

            );

            const distanceB = calculateDistance(

                userLocation.latitude,

                userLocation.longitude,

                b.latitude,

                b.longitude

            );

            return parseFloat(distanceA) - parseFloat(distanceB);

        }

        return 0;

    });

    return (

        <div className="pharmacy-page">

            <h1>Nearby Pharmacies</h1>

            <p>
                Search a medicine to find nearby pharmacies,
                compare prices and locate the closest store.
            </p>

            <MedicineSearch onSearch={handleSearch} />

            <div className="sort-box">

                <label>Sort By:</label>

                <select

                    value={sortBy}

                    onChange={(e) => setSortBy(e.target.value)}

                >

                    <option value="distance">

                        📍 Nearest

                    </option>

                    <option value="price">

                        💰 Cheapest

                    </option>

                    <option value="rating">

                        ⭐ Highest Rated

                    </option>

                </select>

            </div>

            <div className="pharmacy-list">

                {

                    sortedPharmacies.map((pharmacy) => (

                        <PharmacyCard

                            key={pharmacy.pharmacyName}

                            pharmacy={pharmacy}

                            userLocation={userLocation}

                        />

                    ))

                }

            </div>

            {/* Interactive Map */}

            <PharmacyMap pharmacies={sortedPharmacies} />

        </div>

    );

}

export default Pharmacies;