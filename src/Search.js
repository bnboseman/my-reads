import React, {Component } from 'react'
import BookShelf from './BookShelf'
import * as BooksApi from './BooksAPI'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Search extends Component {
    state = {
        maxResults: 20,
        books: [],
        query: ''
    }

    static propTypes = {
        'addToShelf' : PropTypes.func.isRequired
    }

    updateQuery = (query) => {
        this.setState({query: query.trim()})

        if (this.state.query) {
            BooksApi
                .search(this.state.query, this.state.maxResults)
                .then((books) => {
                    if (typeof books.error === 'undefined') {
                        this.setState({books: books, hasError: false})
                    } else {
                        this.setState({books: [], hasError: true})
                    }
                })
        }
    }

    clearQuery = () => {
        this.setState({query: '', books: []})
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => this.updateQuery(event.target.value)}/>

                    </div>
                </div>
                {this.state.books && (
                <div className="search-books-results">
                    <ol className="books-grid">
                        <BookShelf
                            update={this.props.addToShelf}
                            books={this.state.books} />
                    </ol>
                </div>)}
            </div>
        )
    }
}

export default Search;