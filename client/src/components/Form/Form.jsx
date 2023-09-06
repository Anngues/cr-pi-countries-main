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
   const [selectedCountry, setSelectedCountry] = useState([]);
   const [nameError, setNameError] = useState('');
   const [difficultyError, setDifficultyError] = useState('');
   const [durationError, setDurationError] = useState('');
   const [countryError, setCountryError] = useState('');


   useEffect(() => {
      dispatch(getAllCountries())
   }, [dispatch]);

   const handleNameChange = (e) => {
      const newName = e.target.value;
    
      // Limitar a 20 caracteres
      if (newName.length <= 20) {
        // Validar que solo se permitan letras (mayúsculas o minúsculas) y espacios
        if (/^[a-zA-Z\s]*$/.test(newName)) {
          setName(newName);
          setNameError('');
        } else {
          setName('');
          setNameError('El nombre de la actividad solo puede contener letras y espacios.');
        }
      } else {
        setName('');
        setNameError('El nombre de la actividad debe tener como máximo 20 caracteres.');
      }
    };

   const handleDifficultyChange = (e) => {
      const newDifficulty = e.target.value;

      // Validar que la dificultad esté en el rango de 1 a 5
      if (newDifficulty >= 1 && newDifficulty <= 5) {
         setDifficulty(newDifficulty);
         setDifficultyError('');
      } else {
         setDifficulty('');
         setDifficultyError('La dificultad debe estar en el rango de 1 a 5.');
      }
   };

   const handleDurationChange = (e) => {
      const newDuration = e.target.value;

      // Validar que la duración esté en el rango de 00:00 a 24:00
      if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(newDuration)) {
         setDuration(newDuration);
         setDurationError('');
      } else {
         setDuration('');
         setDurationError('La duración debe ser un número entre 1 y 24.');
         // Muestra una alerta
         alert('La duración debe ser un número entre 1 y 24.');
      }
   }

   const handleSeasonChange = (e) => {
      const newSeason = e.target.value;

      // Validar que la estación sea una de las opciones permitidas
      if (['Spring', 'Summer', 'Autumn', 'Winter'].includes(newSeason)) {
         setSeason(newSeason);
      }
   };

   const handlerCountryChange = (event) => {
      const selectCountry = event.target.value;
    
      setSelectedCountry((prevCountries) =>
        prevCountries.includes(selectCountry)
          ? prevCountries.filter((item) => item !== selectCountry)
          : [...prevCountries, selectCountry]
      );
      console.log(selectedCountry);
    };

   const handleSubmit = async (event) => {
      event.preventDefault();

      // Validación del nombre
      if (name.length > 20) {
         setNameError('El nombre de la actividad debe tener como máximo 20 caracteres.');
         return;
      } else {
         setNameError('');
      }

      // Validación de la dificultad
      if (difficultyError) {
         return; // No se envía el formulario si hay un error en la dificultad
      }

       // Validación de la duración
       if (durationError) {
         return; // No se envía el formulario si hay un error en la duración
      }

      if (!['Spring', 'Summer', 'Autumn', 'Winter'].includes(season)) {
         return; // No se envía el formulario si la estación no es válida
      }

        // Validación de la selección de país
      if (selectedCountry.length === 0) {
         setCountryError('Debes seleccionar al menos un país.');
         return;
      } else {
         setCountryError('');
      }

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
      setSelectedCountry([]);
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
               onChange={handleNameChange} // Cambiamos el manejador de eventos
               required
               maxLength={20} // Establecemos el máximo de caracteres
            />
            {nameError && <p className={style.error}>{nameError}</p>}

            <label>Difficulty (1-5):</label>
            <input
               type="number"
               name="difficulty"
               value={difficulty}
               onChange={handleDifficultyChange}
               required
               min="1"
               max="5"
            />
            {difficultyError && <p className={style.error}>{difficultyError}</p>}

            <label>Duration:</label>
            <input
               type="number"
               name="duration"
               value={duration}
               onChange={e => setDuration(e.target.value)}
               required
               min="1"
               max="24"
            />
            {durationError && <p className={style.error}>{durationError}</p>}

            <label>Season:</label>
            <select value={season} onChange={handleSeasonChange} required>
               <option value="">Select a Season</option>
               <option value="Spring">Spring</option>
               <option value="Summer">Summer</option>
               <option value="Autumn">Autumn</option>
               <option value="Winter">Winter</option>
            </select>
            
           <label className={style.label} htmlFor="Countries">Select Country:</label>
          <select
          className={style.select}
            id="countries"
            multiple
            value={selectedCountry}
            onChange={handlerCountryChange}
          >
            {countries.map(type => (
              <option className={style.input} key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
            {countryError && <p className={style.error}>{countryError}</p>} {/* Mostrar el error aquí */}
            <button type="submit">Create Activity</button>
         </form>
      </div>
   );
}

export default Form;