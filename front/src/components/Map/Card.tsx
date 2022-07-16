// import { IData } from "store/features/data";
// import { LatLngLiteral } from "leaflet";
import { IData } from "./Map";
import css from "./Card.module.scss";

// const StyledDiv = styled.div<any>`
//   border-radius: 5px;
//   background-color: inherit;
//   width: 300px;
//   box-shadow: ${({ theme }) => `5px 5px 20px ${theme.colors.base.shadow}`};

//   .card {
//     padding: 0.5rem;
//     font-size: 0.8rem;
//     .title {
//       display: block;
//       text-align: center;
//       padding-bottom: 10px;
//     }

//     .info {
//       display: flex;
//       justify-content: space-between;
//     }
//   }
// `;

export const Card = (props: IData) => {
  return (
    // position={{ lat: props.lat, lng: props.lng }}
    <div {...props}>
      <div className={css.card}>
        <span className={css.title}>{props.location_name}</span>
        <div className={css.info}>
          <div className={css.text}>Координаты:</div>
          <div className={css.value}>
            {props.lat.toFixed(2) + ", " + props.lng.toFixed(2)}
          </div>
        </div>
        <div className={css.info}>
          <div className={css.text}>Описание</div>
        </div>
      </div>
    </div>
  );
};
