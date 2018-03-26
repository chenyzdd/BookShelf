import React from "react"
import * as BooksAPI from './BooksAPI'
import {Link} from "react-router-dom"

export class BookShelf extends React.Component{

    componentDidMount(){
        BooksAPI.getAll().then(books => {
            console.log(books)
            this.props.changeShelf(books);

        })
    }

    ChangeBookStatus(book, e){
        let type = e.target.value;
        if(type === 'details'){
            this.props.changeSelectId(book.id);
            document.getElementById('trigger').click();
        }else{
            BooksAPI.update(book, type).then(response => {
                BooksAPI.getAll().then(books => {
                this.props.changeShelf(books);
            })
            });
        }
    }
    render(){
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                            <ol className="books-grid">
                                {this.props.shelf.filter(book => {return book.shelf === "currentlyReading"}).map((book) => {
                                    return (
                                    <li key={book.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193,  backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select defaultValue="currentlyReading" onChange={(e) => this.ChangeBookStatus(book, e)}>
                                                        <option value="currentlyReading" disabled>Move to...</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="read">Read</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{book.authors && book.authors[0]}</div>
                                        </div>
                                    </li>
                                    )
                                })

                                }
                            </ol>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                            <ol className="books-grid">
                                {this.props.shelf.filter(book => {return book.shelf === "wantToRead"}).map(book => {
                                    return (
                                    <li key={book.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select defaultValue="wantToRead" onChange={(e) => this.ChangeBookStatus(book, e)}>
                                                        <option value="wantToRead" disabled>Move to...</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="read">Read</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{book.authors && book.authors[0]}</div>
                                        </div>
                                    </li>
                                    )
                                })
                                }
                            </ol>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                            <ol className="books-grid">
                                {this.props.shelf.filter(book => {return book.shelf === "read"}).map(book => {
                                    return (
                                    <li key={book.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select defaultValue="read" onChange={(e) => this.ChangeBookStatus(book, e)}>
                                                        <option value="read" disabled>Move to...</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{book.authors && book.authors[0]}</div>
                                        </div>
                                    </li>
                                    )
                                })

                                }

                            </ol>
                            </div>
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to="/search"/>
                    </div>
                </div>
            </div>
        )
    }
}


