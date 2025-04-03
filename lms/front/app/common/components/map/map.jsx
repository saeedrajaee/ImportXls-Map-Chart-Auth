"use client";

import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "../map/map.module.css";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";




export default function Map({ data }) {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const center = { lng: 55.165823, lat: 30.4367 };
  const [zoom] = useState(17);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once



    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(center.lat, center.lng),
      zoom: zoom,
    });

    // const allGCP = 
    const myIcon = L.icon({
      iconUrl: '01.png',
      iconSize: [25, 25],
      iconAnchor: [2, 2],
      popupAnchor: [0, -2]
      // ...
   });
    for (const allGCP of data) {
      const test = L.layerGroup([
        L.marker([allGCP.X, allGCP.Y], {icon: myIcon}).bindPopup(allGCP.description),
      ]).addTo(map.current);
    }

    const OrtoMaydok99 = L.tileLayer
      .wms("http://localhost:8080/geoserver/sde/wms", {
        layers: "Maydok99",
        format: "image/png",
        transparent: true,
      })
      .addTo(map.current);
      const OrtoMaydok1400 = L.tileLayer
      .wms("http://localhost:8080/geoserver/sde/wms", {
        layers: "Maydok1400",
        format: "image/png",
        transparent: true,
      })
      .addTo(map.current);
      const OrtoMaydok1401 = L.tileLayer
      .wms("http://localhost:8080/geoserver/sde/wms", {
        layers: "Maydok1401",
        format: "image/png",
        transparent: true,
      })
      .addTo(map.current);

    // Create a MapTiler Layer inside Leaflet
    new MaptilerLayer({
      // Get your free API key at https://cloud.maptiler.com
      apiKey: "5QzlT2ayhcDNAZx1bc0C",
    }).addTo(map.current);

    const key = "5QzlT2ayhcDNAZx1bc0C";

    const googleIMG = L.tileLayer(
      `https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=${key}`,
      {
        //style URL
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution:
          '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
        crossOrigin: true,
      }
    ).addTo(map.current);

    const basemaps = {
      تصویرراهها: L.tileLayer(
        `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,
        {
          tileSize: 512,
          zoomOffset: -1,
          minZoom: 1,
          attribution:
            '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
          crossOrigin: true,
        }
      ),
    };

    const layerController = L.control.layers(basemaps).addTo(map.current);
    layerController.addBaseLayer(googleIMG, "تصویر گوگل");
    layerController.addOverlay(OrtoMaydok99, "1399 ارتو فتو میدوک");
    layerController.addOverlay(OrtoMaydok1400, "1400 ارتو فتو میدوک");
    layerController.addOverlay(OrtoMaydok1401, "1401 ارتو فتو میدوک");
    // layerController.addOverlay(test, "نقاط کنترلی");
  }, [center.lng, center.lat, zoom]);

  return (
    <div className={styles.mapWrap}>
      <div ref={mapContainer} className={styles.map} />
    </div>
  );
}
