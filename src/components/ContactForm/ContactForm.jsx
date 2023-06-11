import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  onChangeInput = e => {
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

    this.setState({ [name]: formattedValue });
  };

  render() {
    return (
      <form
        className={css.form}
        onSubmit={e => {
          e.preventDefault();
          this.props.onAddContact(this.state);
          this.resetForm();
        }}
      >
        <div className={css.label}>
          <label className={css.labelContainer}>
            Name
            <input
              className={css.input}
              onChange={this.onChangeInput}
              value={this.state.name}
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
              onChange={this.onChangeInput}
              value={this.state.number}
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
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
