// components/Geocoder.tsx
"use client";
type Viewport = {
    center: [number, number];
    
    zoom: number;
    bearing?: number;
    pitch?: number;
};
import { Geocoder as MapboxGeocoder } from '@mapbox/search-js-react';
import { GeocodingFeature } from '@mapbox/search-js-core';

interface GeocoderProps {
    onResult: (data: {
        location: string;
        latitude: number;
        longitude: number;
    }) => void;
}

export const Geocoder: React.FC<GeocoderProps> = ({ onResult }) => {
    return (
        <MapboxGeocoder
            accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN!}
            onSelected={(_viewport: Viewport, item: GeocodingFeature) => {
                onResult({
                    location: item.properties.name,
                    latitude: item.geometry.coordinates[1],
                    longitude: item.geometry.coordinates[0],
                });
            }}
            placeholder="Buscar dirección..."
        />
    );
};
