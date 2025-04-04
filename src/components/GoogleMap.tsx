
import React, { useState } from "react";
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

// Company office locations
export const officeLocations = [
  { 
    id: "sf",
    name: "San Francisco HQ", 
    address: "123 Tech Park, San Francisco, CA 94105",
    position: { lat: 37.7749, lng: -122.4194 },
  },
  { 
    id: "ny",
    name: "New York Office", 
    address: "456 Madison Avenue, New York, NY 10022",
    position: { lat: 40.7128, lng: -74.0060 },
  },
  { 
    id: "london",
    name: "London Office", 
    address: "789 Tech Square, London, UK EC2A 4PF",
    position: { lat: 51.5074, lng: -0.1278 },
  },
  { 
    id: "bangalore",
    name: "Bangalore Tech Center", 
    address: "101 Electronics City, Bangalore, India 560100",
    position: { lat: 12.9716, lng: 77.5946 },
  },
  { 
    id: "singapore",
    name: "Singapore Office", 
    address: "25 Marina Bay, Singapore 018983",
    position: { lat: 1.3521, lng: 103.8198 },
  },
];

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markerTitle?: string;
  height?: string;
  onMapClick?: (location: { lat: number; lng: number }) => void;
  showAllLocations?: boolean;
  selectedLocationId?: string;
}

const MapComponent: React.FC<GoogleMapProps> = ({
  center = defaultCenter,
  zoom = 14,
  markerTitle = "TechNex Headquarters",
  height,
  onMapClick,
  showAllLocations = false,
  selectedLocationId,
}) => {
  // Load the Google Maps JavaScript API
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "", // Use environment variable or fallback
  });

  const mapStyles = {
    ...containerStyle,
    height: height || "400px",
  };

  // Find the selected location or use the provided center
  const selectedLocation = selectedLocationId 
    ? officeLocations.find(loc => loc.id === selectedLocationId)?.position 
    : center;

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
      center={selectedLocation || center} 
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
      {/* Display a single marker or all office locations */}
      {showAllLocations ? (
        officeLocations.map((location) => (
          <Marker 
            key={location.id}
            position={location.position} 
            title={location.name}
            animation={selectedLocationId === location.id ? google.maps.Animation.BOUNCE : undefined}
          />
        ))
      ) : (
        <Marker position={selectedLocation || center} title={markerTitle} />
      )}
    </GoogleMap>
  );
};

export default MapComponent;
