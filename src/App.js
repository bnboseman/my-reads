import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Search from './Search'
import './App.css';

class BooksApp extends Component {
    state = {
        books: []
    }

    addToShelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then((result) => {
                const books = this.state.books;
                const index = books.indexOf(book);
                book.shelf = shelf;
                console.log(book, index)
                if (index > -1) {
                    books[index] = book;
                } else {
                    books.push(book);
                }
                this.setState({books: books})

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
                    <Search addToShelf={(book, shelf) => {
                        this.addToShelf(book, shelf)
                        history.push('/')
                    }}/>
                )}/>

            </div>
        );
    }
}

export default BooksApp;
