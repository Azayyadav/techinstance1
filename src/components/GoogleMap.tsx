
import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

// Default map container style
const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem",
};

// Default center position (San Francisco Tech Park from the contact page)
const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markerTitle?: string;
  height?: string;
  onMapClick?: (location: { lat: number; lng: number }) => void;
}

const MapComponent: React.FC<GoogleMapProps> = ({
  center = defaultCenter,
  zoom = 14,
  markerTitle = "TechNex Headquarters",
  height,
  onMapClick,
}) => {
  // Load the Google Maps JavaScript API
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY", // Use environment variable or fallback
  });

  const mapStyles = {
    ...containerStyle,
    height: height || "400px",
  };

  // Render a loading state while the API is loading
  if (!isLoaded) {
    return (
      <div
        style={{ height: height || "400px" }}
        className="w-full flex items-center justify-center bg-gray-100 rounded-lg"
      >
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (onMapClick && e.latLng) {
      onMapClick({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
  };

  return (
    <GoogleMap 
      mapContainerStyle={mapStyles} 
      center={center} 
      zoom={zoom}
      onClick={handleMapClick}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
      }}
    >
      <Marker position={center} title={markerTitle} />
    </GoogleMap>
  );
};

export default MapComponent;
