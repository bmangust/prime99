import { Circle, Tooltip } from "react-leaflet";
import { Card } from "./Card";
import { IData } from "./Map";
// import { IData } from "store/features/data";

const MINIMUM_MARKER_SIZE = 10000;
/**
 * TODO: adjust values according to the data from orgs
 */
const BLUE_COLOR_MARKER_THRESHHOLD = 10000;
const ORANGE_COLOR_MARKER_THRESHHOLD = 100000;

export const Marker = (props: IData) => {
  const fill =
    props.area_meters < BLUE_COLOR_MARKER_THRESHHOLD
      ? "blue"
      : props.area_meters < ORANGE_COLOR_MARKER_THRESHHOLD
      ? "orange"
      : "red";

  return (
    <Circle
      center={{ lat: props.lng, lng: props.lat }}
      pathOptions={{ fillColor: fill, fillOpacity: 0.7 }}
      //   radius={Math.max(props.area_meters, MINIMUM_MARKER_SIZE)}
      //   stroke={false}
    >
      <Tooltip>
        <Card {...props} />
      </Tooltip>
    </Circle>
  );
};
