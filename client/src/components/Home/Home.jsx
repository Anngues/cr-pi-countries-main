import React, { useState, useEffect } from 'react';
import style from "./Home.module.css";
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import Filters from '../Filters/Filters';
import Sorting from '../Sorting/Sorting';
import CreateActivity from '../Form/CreateActivity';
import NavBar from '../NavBar/NavBar';
import { postActivities } from '../../Redux/actions';
import { useDispatch } from 'react-redux';

export default function Home() {
    const [allCountries, setAllCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [continents, setContinents] = useState([]);
    const [activities, setActivities] = useState([]);
    const [selectedContinent, setSelectedContinent] = useState("");
    const [selectedActivity, setSelectedActivity] = useState("");
    const [sortOption, setSortOption] = useState("name_asc");
    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = 10;
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('http://localhost:3001/countries')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAllCountries(data);
                setFilteredCountries(data);
                const allContinents = [...new Set(data.map(country => country.continent))];
                setContinents(allContinents);
                const allActivities = [...new Set(data.flatMap(country => country.activities))];
                setActivities(allActivities);
            })
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    const handleSearch = (searchTerm) => {
        const filtered = allCountries.filter(country =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCountries(filtered);
        setCurrentPage(1);
    };

    const handleContinentFilter = (event) => {
        setSelectedContinent(event.target.value);
        applyFilters(event.target.value, selectedActivity);
    };

    const handleActivityFilter = (event) => {
        setSelectedActivity(event.target.value);
        applyFilters(selectedContinent, event.target.value);
    };

    const applyFilters = (continent, activity) => {
        let filtered = allCountries;

        if (continent) {
            filtered = filtered.filter(country => country.continent === continent);
        }

        if (activity) {
            filtered = filtered.filter(country => country.activities.includes(activity));
        }

        setFilteredCountries(filtered);
        setCurrentPage(1);
    };

    const handleSort = (event) => {
        setSortOption(event.target.value);
        applySort(event.target.value);
    };

    const applySort = (option) => {
        let sorted = [...filteredCountries];

        switch (option) {
            case "name_asc":
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name_desc":
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "population_asc":
                sorted.sort((a, b) => (a.population || 0) - (b.population || 0));
                break;
            case "population_desc":
                sorted.sort((a, b) => (b.population || 0) - (a.population || 0));
                break;
            default:
                break;
        }

        setFilteredCountries(sorted);
        setCurrentPage(1);
    };

    const handleCreateActivity = (activityData) => {
        dispatch(postActivities(activityData))
        // Handle the creation of the activity, e.g., sending a POST request
        console.log("Creating activity:", activityData);
    };

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);
    const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

    return (
        <div className={style.homeContainer}>
            <h1> COUNTRIES </h1>
            <SearchBar handleSearch={handleSearch} />
            <Filters
                continents={continents}
                activities={activities}
                handleContinentFilter={handleContinentFilter}
                handleActivityFilter={handleActivityFilter}
            />
            <Sorting handleSort={handleSort} />
            <CreateActivity
                countries={allCountries}
                handleCreateActivity={handleCreateActivity}
            />
            <div className={style.cardContainer}>
                {currentCountries.map(country => (
                    <Card
                        key={country.id}
                        id={country.id}
                        name={country.name}
                        image={country.image}
                        continent={country.continent}
                        population={country.population ? country.population : 'No data'}
                    />
                ))}
            </div>
            <div className={style.pagination}>
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
