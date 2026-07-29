import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

function PharmacyMap({ pharmacies }) {

    if (!pharmacies || pharmacies.length === 0) {
        return null;
    }

    const first = pharmacies[0];

    return (

        <MapContainer

            center={[first.latitude, first.longitude]}

            zoom={13}

            style={{
                height: "500px",
                width: "100%",
                borderRadius: "15px",
                marginTop: "30px"
            }}

        >

            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {

                pharmacies.map((pharmacy) => (

                    <Marker

                        key={pharmacy.pharmacyName}

                        position={[
                            pharmacy.latitude,
                            pharmacy.longitude
                        ]}

                    >

                        <Popup>

                            <h3>

                                {pharmacy.pharmacyName}

                            </h3>

                            <p>

                                {pharmacy.address}

                            </p>

                            <p>

                                ₹{pharmacy.price}

                            </p>

                            <p>

                                ⭐ {pharmacy.rating ?? "N/A"}

                            </p>

                            <a

                                href={`https://www.google.com/maps/search/?api=1&query=${pharmacy.latitude},${pharmacy.longitude}`}

                                target="_blank"

                                rel="noreferrer"

                            >

                                Open in Google Maps

                            </a>

                        </Popup>

                    </Marker>

                ))

            }

        </MapContainer>

    );

}

export default PharmacyMap;