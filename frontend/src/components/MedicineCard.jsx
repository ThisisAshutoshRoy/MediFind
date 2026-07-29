function MedicineCard({ medicine }) {

    if (!medicine) {
        return null;
    }

    return (
        <div className="medicine-card">

            <h2>{medicine.name}</h2>

            <p><strong>Manufacturer:</strong> {medicine.manufacturer}</p>

            <p><strong>Active Ingredient:</strong> {medicine.activeIngredient}</p>

            <p><strong>Dosage:</strong> {medicine.dosage}</p>

            <p><strong>Dosage Form:</strong> {medicine.dosageForm}</p>

            <p><strong>Category:</strong> {medicine.category}</p>

            <p><strong>Description:</strong> {medicine.description}</p>

            <p><strong>Side Effects:</strong> {medicine.sideEffects}</p>

        </div>
    );

}

export default MedicineCard;