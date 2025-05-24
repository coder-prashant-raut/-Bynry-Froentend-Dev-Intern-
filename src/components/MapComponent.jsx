import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const MapComponent = ({ lat, lng, name }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map only once
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 12,
      });

      popupRef.current = new mapboxgl.Popup({
        closeOnClick: true,
        closeButton: true,
      });

      markerRef.current = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(popupRef.current)
        .addTo(mapRef.current);

      // Open popup by default
      popupRef.current.setHTML(`<h4>${name}</h4>`).addTo(mapRef.current);

      // Resize map after short delay to fix container size issues
      setTimeout(() => {
        mapRef.current.resize();
      }, 100);
    }

    // Cleanup map on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update marker and popup on lat/lng/name changes
  useEffect(() => {
    if (!mapRef.current || !markerRef.current || !popupRef.current) return;
    mapRef.current.flyTo({ center: [lng, lat], zoom: 12 });
    markerRef.current.setLngLat([lng, lat]);
    popupRef.current.setHTML(`<h4>${name}</h4>`);
  }, [lat, lng, name]);

  return (
    <div
      ref={mapContainer}
      className="w-full rounded-lg shadow-md border text-black"
      style={{ height: '384px' }} // 24rem, same as Tailwind h-96
    />
  );
};

export default MapComponent;
