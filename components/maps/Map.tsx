"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"; // Aseguramos importar los estilos

interface MapProps {
  onSelect: (coords: { latitude: number; longitude: number }) => void;
  initialMarker?: { latitude: number; longitude: number };
  showRadius?: boolean;
  radiusKm?: number;
  height?: string | number;
}

// Obtenemos el token del entorno
const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
if (!mapboxToken) {
  console.error("⚠️ No se encontró la variable NEXT_PUBLIC_MAPBOX_TOKEN en .env.local");
}
mapboxgl.accessToken = mapboxToken || "";

export const Map: React.FC<MapProps> = ({
  onSelect,
  initialMarker,
  showRadius = false,
  radiusKm = 5,
  height = "100%",
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const circleId = "circle-radius-layer";

  // Función para crear un círculo GeoJSON
  const createGeoJSONCircle = (
    center: [number, number],
    radiusInKm: number,
    points = 64
  ) => {
    const coords = {
      latitude: center[1],
      longitude: center[0],
    };
    const km = radiusInKm;
    const ret = [];
    const distanceX =
      km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
    const distanceY = km / 110.574;
    let theta, x, y;
    for (let i = 0; i < points; i++) {
      theta = (i / points) * (2 * Math.PI);
      x = distanceX * Math.cos(theta);
      y = distanceY * Math.sin(theta);
      ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);
    return {
      type: "Feature" as const,
      geometry: {
        type: "Polygon" as const,
        coordinates: [ret],
      },
      properties: {}, // Add an empty properties object
    };
  };

  // Inicializar el mapa y el marker
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Inicializa el mapa solo una vez
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [
          initialMarker?.longitude || -74.2973,
          initialMarker?.latitude || 4.5709,
        ],
        zoom: initialMarker ? 12 : 5,
      });

      // Evento click para seleccionar ubicación
      mapRef.current.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        if (markerRef.current) markerRef.current.remove();
        markerRef.current = new mapboxgl.Marker({ color: "red" })
          .setLngLat([lng, lat])
          .addTo(mapRef.current!);
        onSelect({ latitude: lat, longitude: lng });

        // Dibuja el círculo si corresponde
        if (showRadius) {
          drawCircle([lng, lat]);
        }
      });
    }

    // Coloca el marcador inicial si existe
    if (initialMarker && mapRef.current) {
      if (markerRef.current) markerRef.current.remove();
      markerRef.current = new mapboxgl.Marker({ color: "red" })
        .setLngLat([initialMarker.longitude, initialMarker.latitude])
        .addTo(mapRef.current);

      // Dibuja el círculo si corresponde
      if (showRadius) {
        drawCircle([initialMarker.longitude, initialMarker.latitude]);
      }
    }

    // Limpieza al desmontar
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redibuja el círculo si cambia el radio o el marcador
  useEffect(() => {
    if (
      showRadius &&
      markerRef.current &&
      mapRef.current &&
      markerRef.current.getLngLat()
    ) {
      drawCircle([
        markerRef.current.getLngLat().lng,
        markerRef.current.getLngLat().lat,
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radiusKm, showRadius]);

  // Actualiza el marcador y círculo cuando cambia initialMarker
  useEffect(() => {
    if (initialMarker && mapRef.current) {
      if (markerRef.current) markerRef.current.remove();
      markerRef.current = new mapboxgl.Marker({ color: "red" })
        .setLngLat([initialMarker.longitude, initialMarker.latitude])
        .addTo(mapRef.current);
      mapRef.current.flyTo({ center: [initialMarker.longitude, initialMarker.latitude], zoom: 14 });
      if (showRadius) {
        drawCircle([initialMarker.longitude, initialMarker.latitude]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMarker]);

  // Función para dibujar el círculo en el mapa
  const drawCircle = (center: [number, number]) => {
    if (!mapRef.current) return;
    // Elimina la capa y fuente anterior si existen
    const map = mapRef.current;
    // Eliminar capa de relleno
    if (map.getLayer(circleId)) {
      map.removeLayer(circleId);
    }
    // Eliminar capa de borde
    if (map.getLayer(`${circleId}-outline`)) {
      map.removeLayer(`${circleId}-outline`);
    }
    // Eliminar fuente
    if (map.getSource(circleId)) {
      map.removeSource(circleId);
    }
    // Asegúrate de que el estilo del mapa esté cargado antes de agregar la fuente y las capas
    if (map.isStyleLoaded()) {
      map.addSource(circleId, {
        type: "geojson",
        data: createGeoJSONCircle(center, radiusKm),
      });
      map.addLayer({
        id: circleId,
        type: "fill",
        source: circleId,
        paint: {
          "fill-color": "#007cbf",
          "fill-opacity": 0.1,
        },
      });
      // Capa de borde
      map.addLayer({
        id: `${circleId}-outline`,
        type: "line",
        source: circleId,
        paint: {
          "line-color": "#007cbf",
          "line-width": 1,
        },
      });
    } else {
      map.once("style.load", () => {
        if (map.getSource(circleId)) map.removeSource(circleId);
        map.addSource(circleId, {
          type: "geojson",
          data: createGeoJSONCircle(center, radiusKm),
        });
        map.addLayer({
          id: circleId,
          type: "fill",
          source: circleId,
          paint: {
            "fill-color": "#007cbf",
            "fill-opacity": 0.1,
          },
        });
        map.addLayer({
          id: `${circleId}-outline`,
          type: "line",
          source: circleId,
          paint: {
            "line-color": "#007cbf",
            "line-width": 1,
          },
        });
      });
    }
  };

  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: height, borderRadius: "0.5rem", overflow: "hidden" }}
    />
  );
};
