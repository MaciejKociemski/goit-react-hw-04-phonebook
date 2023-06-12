import React from 'react';
import PropTypes from 'prop-types';
import css from './FilterByName.module.css';

export const FilterByName = ({ filter, onChangeInput }) => {
  return (
    <label className={css.label}>
      Find contacts by name
      <input
        type="text"
        name="filter"
        className={css.input}
        value={filter}
        onChange={onChangeInput}
      />
    </label>
  );
};

FilterByName.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
};
