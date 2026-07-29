function RecommendationCard({ recommendation }) {

    return (

        <div className="recommendation-card">

            <h2>{recommendation.medicineName}</h2>

            <p>
                <strong>Manufacturer:</strong>{" "}
                {recommendation.manufacturer}
            </p>

            <p>
                <strong>Active Ingredient:</strong>{" "}
                {recommendation.activeIngredient}
            </p>

            <p>
                <strong>Dosage:</strong>{" "}
                {recommendation.dosage}
            </p>

            <p>
                <strong>Dosage Form:</strong>{" "}
                {recommendation.dosageForm}
            </p>

            <p>
                <strong>Category:</strong>{" "}
                {recommendation.category}
            </p>

            <p>
                <strong>Recommendation Score:</strong>{" "}
                {recommendation.recommendationScore}%
            </p>

            <p>
                <strong>Reason:</strong>{" "}
                {recommendation.recommendationReason}
            </p>

        </div>

    );

}

export default RecommendationCard;