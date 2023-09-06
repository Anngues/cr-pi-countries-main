import style from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({ id, name, image, continent, population, capital }) {
  return (
     <div className={style.card}>
        <h3 className={style.h3}>{name}</h3>
        <Link to={`/detail/${id}`}>
           <img className={style.image} src={image} alt={`${name} Image`} />
        </Link>
        <h4 className={style.h4}>Cont.: {continent}</h4>
        <h4 className={style.h4}>Pop.: {population}</h4>
        <h4 className={style.h4}>Cap: {capital}</h4>
     </div>
  )
}