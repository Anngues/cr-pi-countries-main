import React from 'react';
import style from "./Sorting.module.css";

export default function Sorting({ handleSort }) {
    return (
        <div className={style.sortingContainer}>
            <label>Sort by:</label>
            <select onChange={handleSort}>
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
                <option value="population_asc">Population (Low to High)</option>
                <option value="population_desc">Population (High to Low)</option>
            </select>
        </div>
    );
}
