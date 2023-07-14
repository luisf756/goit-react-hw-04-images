// import {Component} from 'react'
import './finder.css'
import { Notify } from "notiflix/build/notiflix-notify-aio";
import PropTypes from "prop-types";
import React, { useState } from 'react';

// 
const FinderBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      Notify.failure('Sorry, enter something in search line.');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <>
      <header>
        <form className="search-form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="searchQuery"
              autoComplete="off"
              onChange={handleInputChange}
              autoFocus
              value={query}
              placeholder="Search images..."
              className="input-form"
            />

            <button type="submit">&#x1F36D;</button>
          </div>
        </form>
      </header>
    </>
  );
};

export default FinderBar;
FinderBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};