import { useEffect, useState } from "react";
import { getMedicineNames } from "../services/api";

function MedicineSearch({ onSearch }) {

    const [medicineNames, setMedicineNames] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState("");
    const [filteredMedicines, setFilteredMedicines] = useState([]);

    useEffect(() => {
        loadMedicines();
    }, []);

    const loadMedicines = async () => {

        try {

            const response = await getMedicineNames();

            console.log("Medicine API Response:", response.data);

            console.log("Total medicines:", response.data.length);

            setMedicineNames(response.data);

        }

        catch (error) {

            console.error("Medicine Names API Error:", error);

        }

    };

    const handleChange = (e) => {

        const value = e.target.value;

        console.log("--------------------------------");
        console.log("Typing:", value);
        console.log("Medicine Count:", medicineNames.length);

        setSelectedMedicine(value);

        if (!value.trim()) {

            console.log("Input empty");

            setFilteredMedicines([]);

            return;

        }

        const filtered = medicineNames.filter((medicine) =>
            medicine.toLowerCase().includes(value.toLowerCase())
        );

        console.log("Filtered Medicines:", filtered);

        setFilteredMedicines(filtered.slice(0, 8));

    };

    const handleSelect = (medicine) => {

        console.log("Selected:", medicine);

        setSelectedMedicine(medicine);

        setFilteredMedicines([]);

    };

    const handleSearch = () => {

        console.log("Search button clicked");

        console.log("Selected medicine:", selectedMedicine);

        if (!selectedMedicine.trim()) {

            alert("Please enter a medicine name.");

            return;

        }

        console.log("Calling Home onSearch...");

        onSearch(selectedMedicine);

        setFilteredMedicines([]);

    };

    return (

        <div className="medicine-search">

            <div className="medicine-search-box">

                <input
                    type="text"
                    placeholder="🔍 Search medicine..."
                    value={selectedMedicine}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />

                {selectedMedicine && (

                    <button
                        type="button"
                        className="clear-btn"
                        onClick={() => {

                            setSelectedMedicine("");

                            setFilteredMedicines([]);

                        }}
                    >
                        ✖
                    </button>

                )}

            </div>

            {filteredMedicines.length > 0 && (

                <div className="medicine-suggestions">

                    {filteredMedicines.map((medicine) => (

                        <div
                            key={medicine}
                            className="medicine-suggestion"
                            onClick={() => handleSelect(medicine)}
                        >
                            💊 {medicine}
                        </div>

                    ))}

                </div>

            )}

            <button
                className="search-btn"
                onClick={handleSearch}
            >
                Search
            </button>

        </div>

    );

}

export default MedicineSearch;