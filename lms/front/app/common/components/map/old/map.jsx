"use client";

import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "../map/map.module.css";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import getImportXls from "@/common/action/importXls.api";

// const Map = () => {
export default function Map({data}) {

console.log("1......................",data)

const cityData = [];
const ageData = [];
for (const d of data) {
  cityData.push(d.X);
  ageData.push(d.Y);
}



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

    const GCP1 = L.marker([30.4367, 55.162823]).bindPopup("This is GCP111"),
      GCP2 = L.marker([30.435731, 55.163268]).bindPopup("This is GCP170."),
      GCP3 = L.marker([30.435824, 55.16634]).bindPopup("This is GCP201"),
      GCP4 = L.marker([30.436659, 55.166294]).bindPopup("This is GCP202."),
      GCP5 = L.marker([30.435754, 55.165524]).bindPopup("This is GCP203."),
      GCP6 = L.marker([30.436648, 55.165587]).bindPopup("This is GCP204."),
      GCP7 = L.marker([30.437564, 55.166573]).bindPopup("This is GCP205."),
      GCP8 = L.marker([30.438013, 55.166508]).bindPopup("This is GCP206."),
      GCP9 = L.marker([30.438462, 55.166578]).bindPopup("This is GCP207."),
      GCP10 = L.marker([30.439173, 55.166149]).bindPopup("This is GCP208."),
      GCP11 = L.marker([30.439497, 55.165323]).bindPopup("This is GCP209."),
      GCP12 = L.marker([30.438861, 55.165804]).bindPopup("This is GCP210."),
      GCP13 = L.marker([30.438449, 55.165344]).bindPopup("This is GCP211."),
      GCP14 = L.marker([30.438003, 55.16556]).bindPopup("This is GCP213."),
      GCP15 = L.marker([30.437549, 55.165571]).bindPopup("This is GCP214."),
      GCP16 = L.marker([30.437543, 55.165064]).bindPopup("This is GCP215."),
      GCP17 = L.marker([30.436639, 55.165067]).bindPopup("This is GCP216."),
      GCP18 = L.marker([30.435737, 55.165084]).bindPopup("This is GCP217."),
      GCP19 = L.marker([30.436711, 55.161944]).bindPopup("This is GCP218."),
      GCP20 = L.marker([30.435343, 55.162377]).bindPopup("This is GCP219."),
      GCP21 = L.marker([30.435885, 55.162151]).bindPopup("This is GCP220."),
      GCP22 = L.marker([30.434744, 55.163761]).bindPopup("This is GCP221."),
      GCP23 = L.marker([30.437527, 55.161979]).bindPopup("This is GCP243."),
      GCP24 = L.marker([30.435387, 55.162979]).bindPopup("This is GCP300."),
      GCP25 = L.marker([30.437633, 55.163209]).bindPopup("This is GCP340."),
      GCP26 = L.marker([30.437633, 55.163209]).bindPopup("This is GCP341."),
      GCP27 = L.marker([30.435066, 55.163462]).bindPopup("This is GCP370."),
      GCP28 = L.marker([30.434421, 55.163581]).bindPopup("This is GCP420."),
      GCP29 = L.marker([30.436651, 55.16316]).bindPopup("This is GCP500."),
      GCP30 = L.marker([30.436133, 55.163147]).bindPopup("This is P2."),
      GCP31 = L.marker([30.43605, 55.163149]).bindPopup("This is P3."),
      GCP32 = L.marker([30.435713, 55.163208]).bindPopup("This is P4."),
      GCP33 = L.marker([30.435883, 55.162928]).bindPopup("This is P5."),
      GCP34 = L.marker([30.436668, 55.163369]).bindPopup("This is P6."),
      GCP35 = L.marker([30.436098, 55.163442]).bindPopup("This is P7.");

    const allGCP = L.layerGroup([
      GCP1,
      GCP2,
      GCP3,
      GCP4,
      GCP5,
      GCP6,
      GCP7,
      GCP8,
      GCP9,
      GCP10,
      GCP11,
      GCP12,
      GCP13,
      GCP14,
      GCP15,
      GCP16,
      GCP17,
      GCP18,
      GCP19,
      GCP20,
      GCP21,
      GCP22,
      GCP23,
      GCP24,
      GCP25,
      GCP26,
      GCP27,
      GCP28,
      GCP29,
      GCP30,
      GCP31,
      GCP32,
      GCP33,
      GCP34,
      GCP35,
    ]).addTo(map.current);

    const OrtoMaydok = L.tileLayer
      .wms("http://185.19.201.16:8060/geoserver/lms/wms", {
        layers: "Maydok",
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
    layerController.addOverlay(OrtoMaydok, "ارتو فتو میدوک");
    layerController.addOverlay(allGCP, "نقاط کنترلی");
  }, [center.lng, center.lat, zoom]);

  return (
    <div className={styles.mapWrap}>
      <div ref={mapContainer} className={styles.map} />
    </div>
  );
}

// export default Map;
