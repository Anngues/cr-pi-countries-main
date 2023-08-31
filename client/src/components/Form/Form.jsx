import React, { useState, useEffect } from 'react';
import style from "./Form.module.css";
import { getAllCountries, postActivities } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const Form = () => {
   const dispatch = useDispatch();
   const countries = useSelector(state => state.allCountries);

   const [name, setName] = useState('');
   const [difficulty, setDifficulty] = useState('');
   const [duration, setDuration] = useState('');
   const [season, setSeason] = useState('');
   const [selectedCountry, setSelectedCountry] = useState('');

   useEffect(() => {
      dispatch(getAllCountries())
   }, [dispatch]);

   const handleSubmit = async (event) => {
      event.preventDefault();
      const newActivity = {
         name,
         difficulty: parseInt(difficulty),
         durationHours: parseInt(duration),
         season,
         country: selectedCountry,
      };
      await dispatch(postActivities(newActivity));

      setName('');
      setDifficulty('');
      setDuration('');
      setSeason('');
      setSelectedCountry('');
   };

   return (
      <div className={style.createActivityContainer}>
         <h2>Create New Activity</h2>
         <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
               type="text"
               name="name"
               value={name}
               onChange={e => setName(e.target.value)}
               required
            />
            <label>Difficulty:</label>
            <input
               type="text"
               name="difficulty"
               value={difficulty}
               onChange={e => setDifficulty(e.target.value)}
               required
            />
            <label>Duration:</label>
            <input
               type="text"
               name="duration"
               value={duration}
               onChange={e => setDuration(e.target.value)}
               required
            />
            <label>Season:</label>
            <input
               type="text"
               name="season"
               value={season}
               onChange={e => setSeason(e.target.value)}
               required
            />
            <label>Country:</label>
            <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
               <option value="">Select a Country</option>
               {countries.map(country => (
                  <option key={country.id} value={country.name}>
                     {country.name}
                  </option>
               ))}
            </select>
            <button type="submit">Create Activity</button>
         </form>
      </div>
   );
}

export default Form;