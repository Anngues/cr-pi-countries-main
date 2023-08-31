import React, { useState, useEffect } from 'react';
import style from "./Form.module.css";
import { useDispatch } from 'react-redux';
import { postActivities } from '../../Redux/actions';

export default function CreateActivity({ countries, handleCreateActivity }) {
    const [activityData, setActivityData] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: []
    });
    const dispatch = useDispatch();
    const handleChange = (event) => {
        setActivityData({ 
            ...activityData,[event.target.name]: event.target.value});
        
    };

    const handleCountrySelect = (event) => {
        const selectedCountry = event.target.value;
        if (!activityData.countries.includes(selectedCountry)) {
            setActivityData(prevData => ({
                ...prevData,
                countries: [...prevData.countries, selectedCountry]
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // handleCreateActivity(activityData);
        // setActivityData({
        //     name: "",
        //     difficulty: "",
        //     duration: "",
        //     season: "",
        //     countries: []
        // });
        dispatch(postActivities(activityData));
        alert("Activity created");
    };

//     return (
//         <div className={style.createActivityContainer}>
//             <h2>Create New Activity</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>Name:</label>
//                 <input
//                     type="text"
//                     name="name"
//                     value={activityData.name}
//                     onChange={handleChange}
//                     required
//                 />
//                 <label>Difficulty:</label>
//                 <input
//                     type="number"
//                     name="difficulty"
//                     value={activityData.difficulty}
//                     onChange={handleChange}
//                     required
//                 />
//                 <label>Duration:</label>
//                 <input
//                     type="number"
//                     name="duration"
//                     value={activityData.duration}
//                     onChange={handleChange}
//                     required
//                 />
//                 <label>Season:</label>
//                 <input
//                     type="text"
//                     name="season"
//                     value={activityData.season}
//                     onChange={handleChange}
//                     required
//                 />
//                 <label>Countries:</label>
//                 <select onChange={handleCountrySelect}>
//                     <option value="">Select a Country</option>
//                     {countries.map(country => (
//                         <option key={country.id} value={country.name}>
//                             {country.name}
//                         </option>
//                     ))}
//                 </select>
//                 <ul>
//                     {activityData.countries.map((country, index) => (
//                         <li key={index}>{country}</li>
//                     ))}
//                 </ul>
//                 <button type="submit">Create Activity</button>
//             </form>
//         </div>
//     );
}
