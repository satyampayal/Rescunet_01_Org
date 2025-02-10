import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCasesNearby } from "../redux/slices/caseSlice"; // API call for nearby cases
import { geolib } from "geolib";

const containerStyle = { width: "100%", height: "500px" };
const center = { lat: 28.7041, lng: 77.1025 }; // Default to Delhi, India

const GeoLocationMap = () => {
  const dispatch = useDispatch();
//   const { nearbyCases } = useSelector((state) => state.case);
  const [selectedLocation, setSelectedLocation] = useState(null);

//   useEffect(() => {
//     if (selectedLocation) {
//       dispatch(fetchCasesNearby(selectedLocation));
//     }
//   }, [selectedLocation]);

  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  return (
    <LoadScript googleMapsApiKey={"AIzaSyAWvNtXrbCR8nntM3jHLmi-woX0keuFMzk"}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={handleMapClick}
      >
        {selectedLocation && <Marker position={selectedLocation} />}

        {/* {nearbyCases.map((caseItem) => (
          <Marker key={caseItem._id} position={caseItem.location} />
        ))} */}
      </GoogleMap>
    </LoadScript>
  );
};

export default GeoLocationMap;
