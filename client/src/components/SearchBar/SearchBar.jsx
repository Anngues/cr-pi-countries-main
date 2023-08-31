import React, { useState } from 'react';
import style from "./SearchBar.module.css";

export default function SearchBar({ handleSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch(searchTerm);
    };

    // return (
    //     <div className={style.searchContainer}>
    //         <form onSubmit={handleSubmit}>
    //             <input
    //                 type="text"
    //                 placeholder="Search countries..."
    //                 value={searchTerm}
    //                 onChange={handleChange}
    //             />
    //             <button type="submit">Search</button>
    //         </form>
    //     </div>
    // );
}
