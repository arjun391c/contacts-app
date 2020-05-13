import React, { Component } from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    removeContact: PropTypes.func.isRequired,
  };
  state = {
    search: "",
  };

  onSearch = (input) => {
    this.setState(() => ({
      search: input.trim(),
    }));
  };
  clearSearch=()=>{
      this.setState({
          search: ""
      })
  }
  render() {
    const { search } = this.state;
    const { contacts, removeContact } = this.props;

    const showContacts =
      search === ""
        ? contacts
        : contacts.filter((c) =>
            c.name.toLowerCase().includes(search.toLowerCase())
            );

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search Contacts"
            value={this.state.search}
            onChange={(event) => this.onSearch(event.target.value)}
          />
          <Link
            to="/create"
            className="add-contact"
            >Add Contact</Link>
        </div>
        {showContacts.length !== contacts.length && (
            <div className="showing-contacts">
                <span>Now showing {showContacts.length} of {contacts.length}</span>
                <button onClick={()=> this.clearSearch()}>Show all</button>
            </div>
        )}
        <ol className="contacts-list">
          {showContacts.map((contact) => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL})`,
                }}
              ></div>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button
                className="contact-remove"
                onClick={() => removeContact(contact.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListContacts;
