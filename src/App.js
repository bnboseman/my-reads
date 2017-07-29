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
        BooksAPI.update(book, shelf)
            .then((result) => {
                const books = this.state.books;
                const index = books.indexOf(book);
                book.shelf = shelf;
                if (index > -1) {
                    books[index] = book;
                } else {
                    books.push(book);
                }
                this.setState({books: books})

            })
    }

    search =  (query) => {
        BooksAPI
            .search( query.trim(), this.state.maxResults)
            .then((books) => {
                if (typeof books === 'undefined') {
                    this.setState({query: query.trim(), searchResults: []})
                } else {
                    if (typeof books.error === 'undefined') {
                        this.setState({query: query.trim(), searchResults: books.map((book)=> {
                            book.shelf = 'none'
                            let index = this.state.books.findIndex((shelvedBooks) => {
                                return shelvedBooks.id === book.id
                            })
                            if (index > -1) {
                                book.shelf = this.state.books[index].shelf
                            }
                            return book;
                        })
                        })
                    }

                }
            })

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
                                <BookShelf title="Currently Reading" update={this.addToShelf}
                                           books={this.state.books.filter(book => {
                                               return book.shelf === 'currentlyReading'
                                           })}/>

                                <BookShelf title="Want to Read" update={this.addToShelf}
                                           books={this.state.books.filter(book => {
                                               return book.shelf === 'wantToRead'
                                           })}/>

                                <BookShelf title="Read" update={this.addToShelf}
                                           books={this.state.books.filter(book => {
                                               return book.shelf === 'read'
                                           })}/>
                            </div>
                            <div className="open-search">
                                <Link to="search">Add a book</Link>
                            </div>
                        </div>
                    </div>
                )}/>

                <Route path="/search" render={({history}) => (
                    <Search
                        books={this.state.searchResults}
                        addToShelf={(book, shelf) => {
                        this.addToShelf(book, shelf)
                        history.push('/')
                    }}
                        search={this.search}

                    />
                )}/>

            </div>
        );
    }
}

export default BooksApp;
