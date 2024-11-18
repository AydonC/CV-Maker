import React, { useState } from 'react';
import axios from 'axios';

const Address = ({ updateAddress }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    
    const fetchSuggestions = async (query) => {
        if (query.length < 3) {
            setSuggestions([]); 
            return;
        }

        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: query,
                    format: 'json',
                    addressdetails: 1,
                    limit: 5, 
                },
            });

            const addressResults = response.data.map((item) => ({
                display_name: item.display_name,
                lat: item.lat,
                lon: item.lon,
                address: item.address,
            }));

            setSuggestions(addressResults);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            setSuggestions([]);
        }
    };

    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        fetchSuggestions(newQuery);
    };

    const handleSelectSuggestion = (suggestion) => {
        setQuery(suggestion.display_name);
        setSuggestions([]);
        updateAddress(suggestion); // Pass selected suggestion back to parent
    };

    return (
        <div>
            <label>Address:</label>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter city"
                style={{ width: '400px', padding: '10px' }}
            />
            {suggestions.length > 0 && (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelectSuggestion(suggestion)}
                            style={{
                                padding: '8px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #ddd',
                                backgroundColor: 'antiquewhite',
                                color: 'black',
                                borderRadius: '20px'
                            }}
                        >
                            {suggestion.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Address;
