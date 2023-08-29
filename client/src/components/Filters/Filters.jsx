import React from 'react';
import style from "./Filters.module.css";

export default function Filters({ continents, activities, handleContinentFilter, handleActivityFilter }) {
    return (
        <div className={style.filtersContainer}>
            <div className={style.filter}>
                <label>Filter by Continent:</label>
                <select onChange={handleContinentFilter}>
                    <option value="">All Continents</option>
                    {continents.map(continent => (
                        <option key={continent} value={continent}>
                            {continent}
                        </option>
                    ))}
                </select>
            </div>
            <div className={style.filter}>
                <label>Filter by Activity:</label>
                <select onChange={handleActivityFilter}>
                    <option value="">All Activities</option>
                    {activities.map(activity => (
                        <option key={activity} value={activity}>
                            {activity}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
