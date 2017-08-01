import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Search from './Search'
import './App.css';

class BooksApp extends Component {
  state = {
    books: [],
    query: '',
    searchResults: []
  }

  addToShelf = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf)
        .then((result) => {
          book.shelf = shelf;
          this.setState(state => ({
            books: state.books.filter(b => b.id !== book.id).concat([book])
          }))

        })
    }

  }

  search = (query) => {
    BooksAPI
      .search(query.trim(), this.state.maxResults)
      .then((books) => {
        if (typeof books === 'undefined' || typeof books.error != 'undefined') {
          this.setState({query: query.trim(), searchResults: []})
        } else {
          // Remove duplicate ids which are being returned
          books = books.filter((book, index, self) => self.findIndex((b) => {
            return book.id === b.id
          }) === index)

          this.setState({
            query: query.trim(),
            searchResults: books.map((book) => {
              let index = this.state.books.findIndex((shelvedBooks) => {
                return shelvedBooks.id === book.id
              })
              if (index > -1) {
                book.shelf = this.state.books[index].shelf
              } else {
                book.shelf = 'none'
              }
              return book;
            })
          })

        }
      })

  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books: books})
    })
  }

  render() {
    const shelves = {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read"
    }
    return (
      <div className="App">
        <Route path="/" exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {Object.keys(shelves).map((key) => {
                  return (<BookShelf key={key} title={shelves[key]} update={this.addToShelf}
                                     books={this.state.books.filter(book => {
                                       return book.shelf === key
                                     })}/>)
                })}
              </div>
              <div className="open-search">
                <Link to="search">Add a book</Link>
              </div>
            </div>
          </div>
        )}/>

        <Route path="/search" render={() => (
          <Search
            books={this.state.searchResults}
            addToShelf={(book, shelf) => {
              this.addToShelf(book, shelf)
            }}
            search={this.search}

          />
        )}/>

      </div>
    );
  }
}

export default BooksApp;
