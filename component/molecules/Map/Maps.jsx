import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { icon, divIcon } from "leaflet";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
import { useFilter } from "../../../Context/FilterProvider/FilterProvider";

import { useMapProvider } from "../../../Context/MapProvider/MapProvider";
import { Button } from "../../atoms";
import getLocation from "../../../util/geolocation/geolocation";

const Maps = ({ cities, ...props }) => {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  const keyword = useFilter().keywords;
  const setKeyword = useFilter().handleTextInput;
  const submitRequest = useFilter().submitFilterInput;
  const isOpen = useMapProvider().mapIsOpen;
  const toggleMap = useMapProvider().toggleMap;

  useEffect(() => {
    keyword && submitRequest();
  }, [keyword]);

  useEffect(() => {
    getLocation(setLat, setLon);
  }, []);

  return (
    isOpen && (
      <div className={styles.mapContainerMaster}>
        <MapContainer
          center={lat ? [lat, lon] : [52.3676, 4.9041]}
          zoom={10}
          scrollWheelZoom={false}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {cities &&
            cities.map((el) => {
              return (
                <Marker
                  position={[el.lat, el.lon]}
                  key={el.name}
                  icon={divIcon({
                    html: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g xmlns="http://www.w3.org/2000/svg" transform="matrix(1 0 0 1 31.47 31.19)">
                <g style="">
                        <g transform="matrix(0.48 0 0 0.48 0 0)">
                <linearGradient id="SVGID_1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 -65 -65)" x1="0" y1="0" x2="130" y2="130">
                <stop offset="0%" style="stop-color:rgb(209,80,255);stop-opacity: 1"/>
                <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity: 1"/>
                </linearGradient>
                <circle style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: url(#SVGID_1); fill-rule: nonzero; opacity: 1;" cx="0" cy="0" r="65"/>
                </g>
                        <g transform="matrix(1 0 0 1 -0.19 1.48)" style="">
                        <text xml:space="preserve" font-family="'Open Sans', sans-serif" font-size="18" text-align="center" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1; white-space: pre;"><tspan x="-15.44" y="5.65">${el.count
                          .toString()
                          .padStart(3, " ")}</tspan></text>
                </g>
                </g>
                </g>
                </svg>`,
                    className: "svg-icon",
                    iconSize: [40, 40],
                    iconAnchor: [12, 40],
                  })}
                  eventHandlers={{
                    click() {
                      setKeyword(el.name, "location");
                    },
                  }}
                >
                  <Tooltip>
                    {el.name} {el.count} {el.count > 1 ? "agencies" : "agency"}
                  </Tooltip>
                </Marker>
              );
            })}
        </MapContainer>
        <Button variant="primary" onClick={toggleMap}>
          Close Map
        </Button>
      </div>
    )
  );
};

Maps.propTypes = {};
export default Maps;
