import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

function Map({ markers }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  const [markerObjs, setMarkerObjs] = useState([]);

  const defaultProps = {
    center: { lat: 31.7683, lng: 35.2137 },
    zoom: 8,
  };

  useEffect(() => {
    if (mapRef.current) {
      const mapObj = new window.google.maps.Map(mapRef.current, {
        center: defaultProps.center,
        zoom: defaultProps.zoom,
      });
      setMap(mapObj);
    }
  }, [mapRef]);

  useEffect(() => {
    if (map) {
      // remove or add existing markers as needed
      markerObjs.forEach((marker) => {
        if (!markers.map((m) => m.id).includes(marker.id)) {
          marker.markerRef.setMap(null);
        } else {
          marker.markerRef.setMap(map);
        }
      });
      // create new markers if they dont yet exist
      let newMarkerObjs = [...markerObjs];
      markers.forEach((marker) => {
        if (!markerObjs.map((m) => m.id).includes(marker.id)) {
          const newMarker = new window.google.maps.Marker({
            position: marker.position,
            label: marker.placename,
            map: map,
          });
          newMarkerObjs.push({ id: marker.id, markerRef: newMarker });
        }
      });
      setMarkerObjs(newMarkerObjs);
      // use active markers to pan and zoom the map
      const activeMarkers = newMarkerObjs.filter((marker) =>
        markers.map((m) => m.id).includes(marker.id)
      );
      panMap(activeMarkers);
    }
  }, [markers]);

  window.showLocation = (
    id,
    placename,
    latitude,
    longitude,
    viewLatitude,
    viewLongitude,
    viewTilt,
    viewRoll,
    viewAltitude,
    viewHeading
  ) => {
    panMap(markerObjs.filter((marker) => parseInt(marker.id) === id));
  };

  const panMap = (markersToView) => {
    if (markersToView.length === 1) {
      map.setZoom(10);
      map.panTo(markersToView[0].markerRef.position);
    } else if (markersToView.length > 1) {
      let bounds = new window.google.maps.LatLngBounds();
      markersToView.forEach((marker) => {
        bounds.extend(marker.markerRef.position);
      });
      map.panTo(bounds.getCenter());
      map.fitBounds(bounds);
    }
  };

  return <Box ref={mapRef} sx={{ flexGrow: 1 }}></Box>;
}

export default Map;
