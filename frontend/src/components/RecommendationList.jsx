function RecommendationList({ recommendations, onCompare }) {

    if (!recommendations || recommendations.length === 0) {

        return null;

    }

    return (

        <div>

            <h2
                style={{
                    textAlign: "center",
                    marginTop: "50px",
                    marginBottom: "25px",
                    color: "#2563eb"
                }}
            >
                💊 Recommended Alternatives
            </h2>

            <div className="recommendation-list">

                {

                    recommendations.map((medicine) => (

                        <div
                            key={medicine.medicineName}
                            className="recommendation-item"
                        >

                            <h2>{medicine.medicineName}</h2>

                            <p>
                                <strong>Manufacturer:</strong>{" "}
                                {medicine.manufacturer}
                            </p>

                            <p>
                                <strong>Active Ingredient:</strong>{" "}
                                {medicine.activeIngredient}
                            </p>

                            <p>
                                <strong>Dosage:</strong>{" "}
                                {medicine.dosage}
                            </p>

                            <p>
                                <strong>Form:</strong>{" "}
                                {medicine.dosageForm}
                            </p>

                            <p>
                                <strong>Category:</strong>{" "}
                                {medicine.category}
                            </p>

                            <p>
                                ⭐ <strong>Recommendation Score:</strong>{" "}
                                {medicine.recommendationScore}%
                            </p>

                            <p>
                                <strong>Reason:</strong><br />
                                {medicine.recommendationReason}
                            </p>

                            {

                                onCompare && (

                                    <button
                                        className="search-btn"
                                        style={{ marginTop: "20px" }}
                                        onClick={() =>
                                            onCompare(medicine.medicineName)
                                        }
                                    >
                                        Compare
                                    </button>

                                )

                            }

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default RecommendationList;