import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { FilterByName } from './FilterByName/FilterByName';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleInputChange = ({ currentTarget: { name, value } }) => {
    this.setState({ [name]: value });
  };

  addContact = ({ name, number }) => {
    const contactExists = this.state.contacts.find(
      value => value.name.toLowerCase() === name.toLowerCase()
    );

    contactExists
      ? alert(`${name} is already in contacts`)
      : this.setState(prevState => {
          const list = [...prevState.contacts];
          list.push({
            id: nanoid(),
            name: name,
            number: number,
          });
          return { contacts: list };
        });
  };

  filterContactsByName = () => {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };

  deleteContact = id => {
    const { contacts } = this.state;
    const filtered = contacts.filter(item => item.id !== id);
    this.setState({ contacts: filtered });
  };

  render() {
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <FilterByName
          filter={this.state.filter}
          onChangeInput={this.handleInputChange}
        />
        <ContactList
          deleteContact={this.deleteContact}
          contacts={this.filterContactsByName()}
        />
      </div>
    );
  }
}
