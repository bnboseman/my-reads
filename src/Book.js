import React, {Component} from 'react'
import PropTypes from 'prop-types'
//import {Link} from 'react-router-dom'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired
    }

    render() {
        const image = new Image();
        let height = 193;
        let width = 128;
        image.src = this.props.book.imageLinks.smallThumbnail;

        image.onload = () => {
            height = image.naturalHeight;
            width = image.naturalWidth;
        }
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                         style={
                             {
                             width: width,
                             height: height,
                             backgroundImage: `url(${this.props.book.imageLinks.smallThumbnail})`
                             }
                         }
                    ></div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>

                </div>


                    <div className="book-title">
                        {this.props.book.title}
                    </div>

                    <div className="book-authors">
                        {this.props.book.authors.toString()}
                    </div>

            </div>
        )
    }
}

export default Book;