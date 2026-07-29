import { useState } from "react";

import MedicineSearch from "../components/MedicineSearch";
import RecommendationList from "../components/RecommendationList";

import { getRecommendations } from "../services/api";

function Recommendations() {

    const [recommendations, setRecommendations] = useState([]);

    const handleSearch = async (medicineName) => {

        try {

            const response = await getRecommendations(medicineName);

            setRecommendations(response.data);

        }

        catch (error) {

            console.error(error);

            alert("No recommendations found.");

            setRecommendations([]);

        }

    };

    return (

        <div className="page">

            <h1>Medicine Recommendations</h1>

            <MedicineSearch onSearch={handleSearch} />

            <RecommendationList
                recommendations={recommendations}
            />

        </div>

    );

}

export default Recommendations;