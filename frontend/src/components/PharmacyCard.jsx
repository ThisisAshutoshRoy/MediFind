import { calculateDistance } from "../utils/distance";

function PharmacyCard({ pharmacy, userLocation }) {

    if (!pharmacy) return null;

    let distance = null;

    if (
        userLocation &&
        pharmacy.latitude &&
        pharmacy.longitude
    ) {

        distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            pharmacy.latitude,
            pharmacy.longitude
        );

    }

    const openNow = pharmacy.open24Hours
        ? "24 Hours"
        : `${pharmacy.openingTime} - ${pharmacy.closingTime}`;

    return (

        <div className="pharmacy-card">

            <h2>{pharmacy.pharmacyName}</h2>

            {distance && (
                <p>📍 {distance} km away</p>
            )}

            <hr />

            <p>
                <strong>📍 Address:</strong><br />
                {pharmacy.address}
            </p>

            <p>
                <strong>🏙 City:</strong> {pharmacy.city}
            </p>

            <p>
                <strong>⭐ Rating:</strong> {pharmacy.rating ?? "N/A"}
            </p>

            <p>
                <strong>💰 Price:</strong> ₹{pharmacy.price}
            </p>

            <p>
                <strong>📦 Stock:</strong> {pharmacy.stock}
            </p>

            <p>
                <strong>📞 Phone:</strong> {pharmacy.phoneNumber}
            </p>

            <p>
                <strong>📧 Email:</strong> {pharmacy.email}
            </p>

            <p>
                <strong>🕒 Hours:</strong> {openNow}
            </p>

            <p>
                <strong>Status:</strong>{" "}
                {pharmacy.available
                    ? "🟢 Available"
                    : "🔴 Out of Stock"}
            </p>

            <a
                href={`https://www.google.com/maps/search/?api=1&query=${pharmacy.latitude},${pharmacy.longitude}`}
                target="_blank"
                rel="noreferrer"
            >
                🗺 Open in Google Maps
            </a>

        </div>

    );

}

export default PharmacyCard;