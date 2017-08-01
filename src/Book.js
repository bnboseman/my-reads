import React, {Component} from 'react'
import PropTypes from 'prop-types'
//import {Link} from 'react-router-dom'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired
  }

  state = {
    shelf: "none"
  }

  componentDidMount() {
    if (this.props.book.shelf) {
      this.setState({shelf: this.props.book.shelf})
    }
  }

  render() {
    let image = '';
    image = ( this.props.book.imageLinks && this.props.book.imageLinks.thumbnail )
    const title = this.props.book.title;
    const authors = this.props.book.authors && this.props.book.authors.toString();
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
               style={
                 {
                   width: 128,
                   height: 194,
                   backgroundImage: `url(${image})`
                 }
               }>

          </div>
          <div className="book-shelf-changer">
            <select value={this.state.shelf} onChange={
              (event) => {
                this.props.update(this.props.book, event.target.value)
                this.setState({shelf: event.target.value})
              }}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>

        </div>

        <div className="book-title">{title}</div>

        <div className="book-authors">{authors}</div>

      </div>
    )
  }
}

export default Book;