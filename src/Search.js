import React, {Component} from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class Search extends Component {
  static propTypes = {
    'addToShelf': PropTypes.func.isRequired,
    'search': PropTypes.func.isRequired,
    'books': PropTypes.array.isRequired
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
              onChange={(event) => this.props.search(event.target.value)}/>

          </div>
        </div>
        {(this.props.books.length === 0) && (<div className="search-books-results">
          <h2>No Results</h2>
        </div>)}
        {!this.props.books.error && (
          <div className="search-books-results">
            <ol className="books-grid">
              <BookShelf
                update={this.props.addToShelf}
                books={this.props.books}/>
            </ol>
          </div>)}
      </div>
    )
  }
}

export default Search;