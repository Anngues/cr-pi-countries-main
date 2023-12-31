import style from './DetailPage.module.css'
import { getCountryDetail, disassembleDetail } from '../../Redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';

export default function Detail() {
   const { id } = useParams();
   const dispatch = useDispatch();
   const countryDetail = useSelector(state => state.countryDetail);
   const allActivities = useSelector(state => state.allActivities);
   console.log(allActivities);
   useEffect(() => {
      dispatch(getCountryDetail(id)); //*Dismount.
      return () => dispatch(disassembleDetail()) //*Unmount.
   }, []) //*Update.

   return (
      <div>
         <div className={style.title}><h1>COUNTRY DETAIL</h1></div>
         <div className={style.container}>
            <div className={style.column}>
               <img src={countryDetail.image} alt={`${countryDetail.name} Image`} />
            </div>
            <div className={style.column2}>
               <h4>Country</h4>
               <h2>{countryDetail.name}</h2>
               <h4>International Code</h4>
               <h2>{countryDetail.id}</h2>
               <h4>Continent</h4>
               <h2>{countryDetail.continent}</h2>
               <h4>Capital</h4>
               <h2>{countryDetail.capital}</h2>
               <h4>Subregion</h4>
               <h2>{countryDetail.subregion}</h2>
               <h4>Area</h4>
               <h2>{countryDetail.area}</h2>
               <h4>Population</h4>
               <h2>{countryDetail.population}</h2>
            </div>
         </div>
         <div>
            <h4>Activities</h4>
            {countryDetail.Activities && countryDetail.Activities.length > 0 ? (
               <ul>
                  {countryDetail.Activities.map(activity => (
                     <li key={activity.id}>
                        <strong>Name:</strong> {activity.name}<br />
                        <strong>Difficulty:</strong> {activity.difficulty}<br />
                        <strong>Duration:</strong> {activity.durationHours} hours<br />
                        <strong>Season:</strong> {activity.season}<br />
                     </li>
                  ))}
               </ul>
            ) : (
               <p>No activities available for this country.</p>
            )}
         </div>
         <div className={style.buttonContainer}>
            <button className={style.backButton}>
               <Link to='/home'>Back</Link>
            </button>
         </div>
      </div>
   )
}
