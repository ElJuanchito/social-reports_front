"use client";

import { useState } from "react";
import { Geocoder } from "./maps/GeoCoder";
import { Map } from "./maps/Map";

export interface MapWithSearchProps {
  showRadius?: boolean;
  radiusKm?: number;
  height?: string | number;
  onLocationChange?: (data: {
    latitude: number;
    longitude: number;
    location?: string;
  }) => void;
}

export const MapWithSearch: React.FC<MapWithSearchProps> = ({
  showRadius = true,
  radiusKm = 5,
  height = "500px",
  onLocationChange,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    location?: string;
  } | null>(null);

  const handleLocation = (data: { latitude: number; longitude: number; location?: string }) => {
    setSelectedLocation(data);
    if (onLocationChange) onLocationChange(data);
  };

  return (
    <div style={{ height, display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Geocoder
        onResult={({ latitude, longitude, location }) => {
          handleLocation({ latitude, longitude, location });
        }}
      />
      <Map
        initialMarker={
          selectedLocation
            ? {
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }
            : undefined
        }
        onSelect={(coords) => {
          handleLocation(coords);
        }}
        showRadius={showRadius}
        radiusKm={radiusKm}
        height={height}
      />
      {selectedLocation?.location && (
        <div className="text-sm text-gray-600 mt-2">
          Dirección seleccionada: {selectedLocation.location}
        </div>
      )}
    </div>
  );
};
