import "ol/ol.css";
import { useEffect, useRef, useState } from "react";
import OlMap from "ol/Map";
import View from "ol/View";
import Point from "ol/geom/Point";
import { Circle } from "ol/geom";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Select } from "ol/interaction";
import { Fill, Stroke, Style } from "ol/style";
import { Coordinate } from "ol/coordinate";
import Feature from "ol/Feature";
import { toLonLat, fromLonLat } from "ol/proj";
import { toStringHDMS } from "ol/coordinate";
import { Overlay } from "ol";
import css from "./Map.module.scss";
import { Card } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export interface IData {
  lat: number;
  lng: number;
  area_meters: number;
  location_name: string;
}

const selectedStyle = new Style({
  fill: new Fill({
    color: "rgba(255, 255, 255, 0.6)",
  }),
  stroke: new Stroke({
    color: "rgba(255, 255, 255, 0.7)",
    width: 2,
  }),
});

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

const Map = () => {
  const cardRef = useRef(null);
  const [overlay, setOverlay] = useState<Overlay>();
  const [state, setState] = useState<{ center: Coordinate; zoom: number }>({
    center: [0, 0],
    zoom: 1,
  });
  const [map, setMap] = useState<OlMap | null>(null);
  const [cardData, setCardData] = useState("");
  const [selected, setSelected] = useState("");
  const [source, setSource] = useState<VectorSource>();

  const handleClose = () => {
    if (!overlay) return;
    overlay.setPosition(undefined);
    return false;
  };

  const getRandomFeature = () => {
    const x = Math.random() * 360 - 180;
    const y = Math.random() * 170 - 85;
    const geom = new Point(fromLonLat([x, y]));
    const feature = new Feature(geom);
    return feature;
  };

  const loadFeatures = (source: VectorSource) => {
    const features = new Array(10).fill(0).map(getRandomFeature);
    features.forEach((feature) => {
      source?.addFeature(feature);
    });
  };

  // set overlay
  useEffect(() => {
    if (!cardRef.current) return;

    console.dir(cardRef.current);

    const overlay = new Overlay({
      element: cardRef.current,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });

    const source = new VectorSource({
      wrapX: false,
    });
    const vector = new VectorLayer({
      source: source,
    });
    setSource(source);

    const map = new OlMap({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vector,
      ],
      overlays: [overlay],
      view: new View({
        center: state.center,
        zoom: state.zoom,
      }),
    });
    loadFeatures(source);

    setMap(map);
    setOverlay(overlay);
  }, []);

  // ADD LISTENERS
  useEffect(() => {
    if (!map) return;
    map.setTarget("map");

    // map panning listner
    map?.on("moveend", () => {
      let center = map?.getView().getCenter();
      let zoom = map?.getView().getZoom();
      if (!center || !zoom) return;
      setState({ center, zoom });
    });

    // add click listeners
    map.on("singleclick", function (evt) {
      const coordinate = evt.coordinate;
      const hdms = toStringHDMS(toLonLat(coordinate));
      setCardData("You clicked here: " + hdms);
      // overlay?.setPosition(coordinate);
    });
  }, [map]);

  // SELECT FEATURE
  useEffect(() => {
    if (!map) return;

    // a normal select interaction to handle click
    const select = new Select({
      style: function (feature) {
        const color = feature.get("COLOR_BIO") || "#eeeeee";
        selectedStyle.getFill().setColor(color);
        return selectedStyle;
      },
    });
    map.addInteraction(select);

    const selectedFeatures = select.getFeatures();
    selectedFeatures.on(["add", "remove"], function () {
      const names = selectedFeatures.getArray().map(function (feature) {
        return feature.get("ECO_NAME");
      });
      if (names.length > 0) {
        setSelected(names.join(", "));
      } else {
        setSelected("None");
      }
    });
  }, [map]);

  const updateMap = () => {
    map?.getView().setCenter(state.center);
    map?.getView().setZoom(state.zoom);
  };

  updateMap();
  return (
    <>
      <div
        id="map"
        style={{ width: "100%", height: "100%", minHeight: "500px" }}
      ></div>
      <Card
        className={css.card}
        title="Card title"
        ref={cardRef}
        extra={
          <CloseOutlined
            className={css.close}
            style={{ color: "red" }}
            key="close"
            onClick={handleClose}
          />
        }
      >
        <div className={css.data}>{cardData}</div>
      </Card>
      <div>{selected}</div>
    </>
  );
};

export default Map;
