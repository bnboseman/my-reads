import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
//import {Link} from 'react-router-dom'

class BookShelf extends Component {
    static propTypes = {
        title: PropTypes.string,
        books: PropTypes.array.isRequired,
        update: PropTypes.func.isRequired
    }

    render() {
        const {books, title} = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>

                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book => (
                                <li key={book.id}>
                                    <Book book={book} update={this.props.update}/>
                                </li>
                            )
                        )}
                    </ol>
                </div>
            </div>
        )
    }

}

export default  BookShelf;