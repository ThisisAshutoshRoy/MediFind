import { useEffect, useState } from "react";

import {
    getMedicineNames,
    compareTwoMedicines
} from "../services/api";

import ComparisonCard from "../components/ComparisonCard";
import { useSearchParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function Compare() {

    const [medicineNames, setMedicineNames] = useState([]);

    const [medicine1, setMedicine1] = useState("");

    const [medicine2, setMedicine2] = useState("");

    const [comparison, setComparison] = useState(null);

    const [searchParams] = useSearchParams();

    useEffect(() => {

        loadMedicines();

        const medicine = searchParams.get("medicine");

        if (medicine) {
            setMedicine1(medicine);
        }

    }, []);

    const loadMedicines = async () => {

        try {

            const response = await getMedicineNames();

            setMedicineNames(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleCompare = async () => {

        if (!medicine1 || !medicine2) {

            alert("Please select both medicines.");

            return;

        }

        try {

            const response = await compareTwoMedicines(
                medicine1,
                medicine2
            );

            setComparison(response.data);

        } catch (error) {

            console.error(error);

            alert("Comparison failed.");

        }

    };

    return (

        <div className="compare-page">

            <h1>Compare Medicines</h1>

            <div className="compare-box">

                <Autocomplete
                    options={medicineNames}
                    sx={{ width: "100%" }}
                    value={medicine1}
                    onChange={(event, value) => setMedicine1(value || "")}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="First Medicine"
                        />
                    )}
                />

                <Autocomplete
                    options={medicineNames}
                    sx={{ width: 300 }}
                    value={medicine2}
                    onChange={(event, value) => setMedicine2(value || "")}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Second Medicine"
                        />
                    )}
                />

                <button onClick={handleCompare}>
                    Compare
                </button>

            </div>

            <ComparisonCard comparison={comparison} />

        </div>

    );

}

export default Compare;