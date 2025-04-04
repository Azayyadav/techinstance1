
import React from "react";
import { officeLocations } from "./GoogleMap";
import { cn } from "@/lib/utils";

interface OfficeLocationSelectorProps {
  selectedLocationId: string;
  onLocationSelect: (locationId: string) => void;
}

const OfficeLocationSelector: React.FC<OfficeLocationSelectorProps> = ({
  selectedLocationId,
  onLocationSelect,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Our Global Offices</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {officeLocations.map((location) => (
          <button
            key={location.id}
            onClick={() => onLocationSelect(location.id)}
            className={cn(
              "p-3 rounded-lg transition-all text-left",
              selectedLocationId === location.id
                ? "bg-it-blue-light text-white shadow-md"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            )}
          >
            <p className="font-medium">{location.name}</p>
            <p className="text-xs mt-1 line-clamp-2">
              {location.address}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OfficeLocationSelector;
