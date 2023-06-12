import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const onChangeInput = e => {
    const { name, value } = e.currentTarget;

    const formattedValue =
      name === 'number'
        ? value
            .replace(/[^0-9-]/g, '')
            .replace(/(-{2,})/g, '-')
            .replace(/(^-|-$)/g, '')
            .replace(/(-)/g, '')
            .match(/.{1,3}/g)
            .join('-')
            .trim()
        : value;

    if (name === 'name') {
      setName(formattedValue);
    } else if (name === 'number') {
      setNumber(formattedValue);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onAddContact({ name, number });
    resetForm();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.label}>
        <label className={css.labelContainer}>
          Name
          <input
            className={css.input}
            onChange={onChangeInput}
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
      </div>
      <div className={css.label}>
        <label className={css.labelContainer} htmlFor="number">
          Number
          <input
            className={css.input}
            onChange={onChangeInput}
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
      </div>
      <div>
        <button className={css.button} type="submit">
          Add contact
        </button>
      </div>
    </form>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
