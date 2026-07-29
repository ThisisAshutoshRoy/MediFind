function ComparisonCard({ comparison }) {

    if (
        !comparison ||
        !comparison.searchedMedicine ||
        !comparison.alternativeMedicine
    ) {
        return null;
    }

    const searched = comparison.searchedMedicine;
    const alternative = comparison.alternativeMedicine;

    return (

        <div className="comparison-card">

            <div className="comparison-header">

                <h2>📊 Medicine Comparison</h2>

                <p>
                    Compare both medicines side-by-side before making a choice.
                </p>

            </div>

            <table className="comparison-table">

                <thead>

                    <tr>

                        <th>Feature</th>

                        <th>💊 {searched.medicineName}</th>

                        <th>💊 {alternative.medicineName}</th>

                    </tr>

                </thead>

                <tbody>

                    <tr>
                        <td>🏭 Manufacturer</td>
                        <td>{searched.manufacturer}</td>
                        <td>{alternative.manufacturer}</td>
                    </tr>

                    <tr>
                        <td>🧪 Active Ingredient</td>
                        <td>{searched.activeIngredient}</td>
                        <td>{alternative.activeIngredient}</td>
                    </tr>

                    <tr>
                        <td>💉 Dosage</td>
                        <td>{searched.dosage}</td>
                        <td>{alternative.dosage}</td>
                    </tr>

                    <tr>
                        <td>💊 Dosage Form</td>
                        <td>{searched.dosageForm}</td>
                        <td>{alternative.dosageForm}</td>
                    </tr>

                    <tr>
                        <td>📦 Category</td>
                        <td>{searched.category}</td>
                        <td>{alternative.category}</td>
                    </tr>

                    <tr>
                        <td>💰 Lowest Price</td>

                        <td>
                            {searched.lowestPrice
                                ? `₹${searched.lowestPrice}`
                                : "N/A"}
                        </td>

                        <td>
                            {alternative.lowestPrice
                                ? `₹${alternative.lowestPrice}`
                                : "N/A"}
                        </td>

                    </tr>

                    <tr>

                        <td>✅ Availability</td>

                        <td>

                            <span className={searched.available ? "available" : "unavailable"}>
                                {searched.available ? "Available" : "Unavailable"}
                            </span>

                        </td>

                        <td>

                            <span className={alternative.available ? "available" : "unavailable"}>
                                {alternative.available ? "Available" : "Unavailable"}
                            </span>

                        </td>

                    </tr>

                    <tr>

                        <td>🏪 Pharmacies</td>

                        <td>{searched.totalPharmacies}</td>

                        <td>{alternative.totalPharmacies}</td>

                    </tr>

                    <tr>

                        <td>⭐ Recommendation Score</td>

                        <td>

                            <span className="score">
                                {searched.recommendationScore}%
                            </span>

                        </td>

                        <td>

                            <span className="score">
                                {alternative.recommendationScore}%
                            </span>

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    );

}

export default ComparisonCard;