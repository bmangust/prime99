// import React, { useCallback, useEffect, useState } from "react";
// // import styled from "styled-components";
import useSWR from "swr";
// // import { MapContainer, useMap, TileLayer } from "react-leaflet";
// import classNames from "classnames";
// import { Map as LeafletMap } from "leaflet";
// import { debounce } from "lodash";
// import { Marker } from "components/Map/Marker";
// import css from "./Map.module.scss";
// import {
//   MapContainer,
//   TileLayer,
//   useMap,
// } from "https://cdn.esm.sh/react-leaflet";

export interface IData {
  lat: number;
  lng: number;
  area_meters: number;
  location_name: string;
}

// interface Props {
//   className?: string;
// }
// interface IResponse {
//   status: true;
//   error: null;
//   data: IData[];
// }
// async function fetcher<JSON = any>(
//   input: RequestInfo,
//   init?: RequestInit
// ): Promise<JSON> {
//   const res = await fetch(input, init);
//   return res.json();
// }

// const Map = ({ className }: Props) => {
//   const [{ center, zoom }, setMapParams] = useState({
//     center: { lat: 60.51, lng: 71.04 },
//     zoom: 6,
//   });
//   //@ts-ignore
//   const [map, setMap] = useState<LeafletMap>(null);
//   const { data } = useSWR<IResponse>(
//     "http://localhost/backend/records",
//     fetcher
//   );
//   console.log(data);

//   //а нужно ли?
//   useEffect(() => {
//     setMap(map);
//   }, []);

//   const onMove = useCallback(() => {
//     const onMoveCallback = debounce(() => {
//       const { lat, lng } = map?.getCenter() || center;
//       const newZoom = map?.getZoom() || zoom;
//       setMapParams({ center: { lat, lng }, zoom: newZoom });
//     }, 1000);
//     onMoveCallback();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [map]);

//   useEffect(() => {
//     map?.on("move", onMove);
//     return () => {
//       map?.off("move", onMove);
//     };
//   }, [map, onMove]);

//   return (
//     <div className={classNames(css.map, className)}>
//       <MapContainer
//         center={center}
//         zoom={zoom}
//         scrollWheelZoom={true}
//         style={{ height: "100%", width: "100%" }}
//         whenCreated={(map: LeafletMap) => setMap(map)}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           maxZoom={20}
//           // attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
//           url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
//         />

//         {data?.data?.map((el, i) => (
//           <Marker key={el.location_name + i} {...el} />
//         ))}
//       </MapContainer>
//     </div>
//   );
// };

// export default Map;
