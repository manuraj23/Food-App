import React, { useState } from 'react';
import { searchQuestions } from '../utils/grpcClient';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const searchResults = await searchQuestions(query);
        setResults(searchResults);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search for questions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <div className="results">
                {results.length > 0 ? (
                    results.map((question, index) => (
                        <div key={index} className="result-item">
                            <h3>{question.title}</h3>
                            <p>{question.type}</p>
                            {question.options && <ul>{question.options.map((option, i) => <li key={i}>{option}</li>)}</ul>}
                        </div>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default Search;

