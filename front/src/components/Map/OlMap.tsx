import "ol/ol.css";
import { useEffect, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Coordinate } from "ol/coordinate";
import { Circle } from "ol/geom";
import Feature from "ol/Feature";
import { Style } from "ol/style";
import { ZoomToExtent, defaults as defaultControls } from "ol/control";

const circleFeature = new Feature({
  geometry: new Circle([12127398.797692968, 4063894.123105166], 500000),
});

circleFeature.setStyle(
  new Style({
    renderer(coordinates, state) {
      //@ts-ignore
      const [[x, y], [x1, y1]] = coordinates;
      const ctx = state.context;
      const dx = x1 - x;
      const dy = y1 - y;
      const radius = Math.sqrt(dx * dx + dy * dy);

      const innerRadius = 0;
      const outerRadius = radius * 1.4;

      const gradient = ctx.createRadialGradient(
        x,
        y,
        innerRadius,
        x,
        y,
        outerRadius
      );
      gradient.addColorStop(0, "rgba(255,0,0,0)");
      gradient.addColorStop(0.6, "rgba(255,0,0,0.2)");
      gradient.addColorStop(1, "rgba(255,0,0,0.8)");
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
      ctx.strokeStyle = "rgba(255,0,0,1)";
      ctx.stroke();
    },
  })
);

const MyMap = () => {
  const [state, setState] = useState<{ center: Coordinate; zoom: number }>({
    center: [0, 0],
    zoom: 1,
  });
  const [map, _] = useState<Map | null>(
    new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [circleFeature],
          }),
        }),
      ],
      view: new View({
        center: state.center,
        zoom: state.zoom,
      }),
    })
  );

  useEffect(() => {
    map?.setTarget("map");

    // Listen to map changes
    map?.on("moveend", () => {
      let center = map?.getView().getCenter();
      let zoom = map?.getView().getZoom();
      if (!center || !zoom) return;
      setState({ center, zoom });
    });
  }, []);

  const updateMap = () => {
    map?.getView().setCenter(state.center);
    map?.getView().setZoom(state.zoom);
  };

  updateMap();
  return <div id="map" style={{ width: "100%", height: "1000px" }}></div>;
};

export default MyMap;
