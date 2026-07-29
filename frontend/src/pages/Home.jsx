import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MedicineSearch from "../components/MedicineSearch";
import RecommendationList from "../components/RecommendationList";

import { getRecommendations } from "../services/api";

function Home() {

    const navigate = useNavigate();

    const [recommendations, setRecommendations] = useState([]);

    const handleSearch = async (medicineName) => {

        try {

            const response = await getRecommendations(medicineName);

            setRecommendations(response.data);

        }

        catch (error) {

            console.error(error);

            alert("Medicine not found.");

            setRecommendations([]);

        }

    };

    const handleCompare = (medicineName) => {

        navigate(`/compare?medicine=${encodeURIComponent(medicineName)}`);

    };

    return (

        <div className="home-page">

            <section className="hero">

                <h1>💊 MediFind</h1>

                <p>
                    Find affordable medicine alternatives,
                    compare medicines and locate nearby pharmacies instantly.
                </p>

                <MedicineSearch
                    onSearch={handleSearch}
                />

            </section>

            <section className="stats">

                <div className="stat-card">
                    <h2>💊</h2>
                    <h3>Medicine Search</h3>
                    <p>Search thousands of medicines instantly.</p>
                </div>

                <div className="stat-card">
                    <h2>🤖</h2>
                    <h3>Recommendations</h3>
                    <p>AI-powered medicine recommendations.</p>
                </div>

                <div className="stat-card">
                    <h2>📊</h2>
                    <h3>Comparison</h3>
                    <p>Compare medicines side-by-side.</p>
                </div>

                <div className="stat-card">
                    <h2>📍</h2>
                    <h3>Nearby Pharmacies</h3>
                    <p>Find pharmacies with the best prices.</p>
                </div>

            </section>

            <section className="info-section">

                <h2>How MediFind Works</h2>

                <div className="info-grid">

                    <div className="info-card">
                        <h3>🔍 Search</h3>
                        <p>Search your medicine by name.</p>
                    </div>

                    <div className="info-card">
                        <h3>🤖 Recommend</h3>
                        <p>Get affordable alternatives instantly.</p>
                    </div>

                    <div className="info-card">
                        <h3>📊 Compare</h3>
                        <p>Compare dosage, manufacturer, price and availability.</p>
                    </div>

                    <div className="info-card">
                        <h3>📍 Locate</h3>
                        <p>Find nearby pharmacies using an interactive map.</p>
                    </div>

                </div>

            </section>

            <RecommendationList
                recommendations={recommendations}
                onCompare={handleCompare}
            />

        </div>

    );

}

export default Home;