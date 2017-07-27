import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import './App.css';

class BooksApp extends Component {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books: books})
        })
    }
  render() {
    return (
      <div className="App">
          <Route path="/" exact render={() => (
              <div className="list-books">
                  <div className="list-books-title">
                      <h1>My Reads</h1>
                  </div>
                  <div className="list-books-content">
                      <div>
                          <BookShelf title="Currently Reading" books={this.state.books.filter( book => {return book.shelf === 'currentlyReading'})}/>

                          <BookShelf title="Want to Read" books={this.state.books.filter( book => {return book.shelf === 'wantToRead'})}/>

                          <BookShelf title="Read" books={this.state.books.filter( book => {return book.shelf === 'read'})}/>
                      </div>
                  </div>
              </div>
          )} />

      </div>
    );
  }
}

export default BooksApp;
