import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl"; // Import mapboxgl

const Maps = ({ document1Data, document2Data }) => {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (
      document1Data &&
      document1Data.campus_locations_all_locations.length > 0
    ) {
      setShowMap(true);
      initializeMap();
    } else {
      setShowMap(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document1Data]);

  const initializeMap = () => {
    // Initialize Mapbox
    mapboxgl.accessToken =
      "pk.eyJ1IjoiaGFtemExNjYxNSIsImEiOiJjbHUxdDliOWEwZ3ZhMnFvNjYwdGZrYW5sIn0.7LD0akuSxbBknhyalhb3kQ";

    // Ensure that the map container element exists
    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 5,
    });

    addMarkersToMap(map, document1Data.campus_locations_all_locations);
  };

  const addMarkersToMap = (map, locations) => {
    if (!locations || !Array.isArray(locations)) return; // Check if locations is valid

    locations.forEach((location, index) => {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          location
        )}.json?access_token=${mapboxgl.accessToken}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.features && data.features.length > 0) {
            const coordinates = data.features[0].center;
            // eslint-disable-next-line no-unused-vars
            const marker = new mapboxgl.Marker({ color: "red" })
              .setLngLat(coordinates)
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setHTML(
                  `<h6><b>${document2Data.image_name}</b></h6><p>${location}</p>`
                )
              )
              .addTo(map);

            // Center map on the coordinates of the first marker
            if (index === 0) {
              map.setCenter(coordinates);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching geocode data:", error);
        });
    });
  };

  return (
    showMap && (
      <>
        <h3>{document1Data.campus_locations_heading} on Maps</h3>
        <div
          id="map"
          style={{
            width: "100%",
            height: "600px",
            borderRadius: " 12px",
            border: " 4px solid rgb(142 185 255)",
            boxShadow: " rgba(9, 19, 35, 0.1) 0px 0px 6px 4px",
          }}
        ></div>
      </>
    )
  );
};

Maps.propTypes = {
  document1Data: PropTypes.object,
  document2Data: PropTypes.object,
};

export default Maps;
