import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilesView from './ProfilesView';
import './Search.css';

const FindJob = ({ placeholder, handlePredict }) => {
  const [searchValue, setSearchValue] = useState('');
  const [predictedCategory, setPredictedCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const categories = [
        'House Keeper',
        'Retail Sales Worker',
        'Food Service Worker', 
        'Janitor',
       ' Farmworker',
        'Security Guard',
        'Gardener',
        'Laundry Worker',
        'Construction Laborer',
        'Cook',
        'Car Driver',
       ' Delivery Driver',
        'Call Center Operator',
        'Elderly Caregiver',
        'Clerk',
        'Pet Groomer',
        'Child Caregiver',
        'Factory Worker',
        'Street Vendor',
  ];

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    console.log('Searching for:', searchValue);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: searchValue }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response:', data);
      setPredictedCategory(data.predicted_category_label);
      handlePredict(data.predicted_category_label);
    } catch (error) {
      console.error('Error predicting category:', error);
    }
  };

  const handleViewProfiles = (category) => {
    setSelectedCategory(category);
    navigate(`/profiles/${encodeURIComponent(category)}`);
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleSearchInputChange}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {predictedCategory && (
        <div className='searchresult'>
          <a href="#" onClick={() => handleViewProfiles(predictedCategory)}>
            {predictedCategory}
          </a>
        </div>
      )}

      <h3>Categories</h3>
      <div className="category-list">
        {categories.map((category, index) => (
          <div key={index}>
            <h4>{category}</h4>
            <a href="#" onClick={() => handleViewProfiles(category)}>
              Learn More
            </a>
          </div>
        ))}
      </div>

      {selectedCategory && <ProfilesView predictedCategory={selectedCategory} />}
    </>
  );
};

export default FindJob;
