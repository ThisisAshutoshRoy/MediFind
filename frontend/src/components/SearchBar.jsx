import { useState } from "react";

function SearchBar({ onSearch }) {

    const [medicine, setMedicine] = useState("");

    const handleSearch = () => {

        if (medicine.trim() === "") {
            alert("Please enter a medicine name.");
            return;
        }

        onSearch(medicine);

    };

    return (
        <div className="search-container">

            <input
                type="text"
                placeholder="Enter medicine name..."
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
            />

            <button onClick={handleSearch}>
                Search
            </button>

        </div>
    );

}

export default SearchBar;