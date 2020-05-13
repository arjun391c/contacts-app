import React, { Component } from "react";
import ListContacts from "./ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";
import { Route } from "react-router-dom";

export class App extends Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({
        contacts,
      });
    });
  }
  
  createContact = (contact)=>{
    ContactsAPI.create(contact)
      .then((contact)=>{
        this.setState({
          contacts: [...this.state.contacts,contact]
        })
      })
  }
  removeContact = (id) => {
    ContactsAPI.remove(id);
    this.setState({
      contacts: this.state.contacts.filter((contact) => contact.id !== id),
    });
  };


  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts
              removeContact={this.removeContact}
              contacts={this.state.contacts}
            />
          )}
        />
        <Route path="/create" render={({history})=>(
          <CreateContact onCreateContact={(contact)=>{
            this.createContact(contact);
            history.push("/");
          }}
            />
        )}/>
      </div>
    );
  }
}

export default App;
