import React, {Component} from 'react'
import BookShelf from './BookShelf'
import * as BooksApi from './BooksAPI'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class Search extends Component {
    state = {
        maxResults: 20,
        books: []
    }

    static propTypes = {
        'addToShelf': PropTypes.func.isRequired
    }

    updateQuery = (query) => {
        BooksApi
            .search( query.trim(), this.state.maxResults)
            .then((books) => {
                if (!(typeof books.error === 'undefined')) {
                    this.setState({query: query.trim(), books: []})
                } else {
                    this.setState({query: query.trim(), books: books})
                }
            })

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
                {(this.state.books.length === 0) && (<div className="search-books-results">
                        <h2>No Results</h2>
                </div>)}
                {!this.state.books.error && (
                    <div className="search-books-results">
                        <ol className="books-grid">
                            <BookShelf
                                update={this.props.addToShelf}
                                books={this.state.books}/>
                        </ol>
                    </div>)}
            </div>
        )
    }
}

export default Search;