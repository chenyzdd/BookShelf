import React from "react"
import * as BooksAPI from './BooksAPI'
import {Link} from "react-router-dom"

export class BookShelf extends React.Component{
    state = {
        reading: [],
        read: [],
        wantToRead: []
    };
    componentDidMount(){
        BooksAPI.getAll().then(books => {
            this.setState((state) => ({
                reading: books.filter((book => book.shelf === "currentlyReading")),
                read: books.filter((book => book.shelf === "read")),
                wantToRead: books.filter((book => book.shelf === "wantToRead"))
            }));

        })
    }

    ChangeBookStatus(book, e){
        let type = e.target.value;
        console.log(book);
        if(type === 'ReadingToWantRead'){
            this.setState((state) => ({
                reading: state.reading.filter(item => item.id !== book.id),
                wantToRead: state.wantToRead.concat([book])
            }));
            BooksAPI.update(book, 'read');
            console.log(this.state.reading);
        }
        if(type === 'ReadingToRead'){
            this.setState((state) => ({
                reading: state.reading.filter(item => item.id !== book.id),
                read: state.read.concat([book])
            }));
        }
        if(type === 'WantReadToReading'){
            this.setState((state) => ({
                wantToRead: state.wantToRead.filter(item => item.id !== book.id),
                reading: state.reading.concat([book])
            }));
        }
        if(type === 'WantReadToRead'){
            this.setState((state) => ({
                wantToRead: state.wantToRead.filter(item => item.id !== book.id),
                read: state.read.concat([book])
            }));
        }
        if(type === 'ReadToReading'){
            this.setState((state) => ({
                read: state.read.filter(item => item.id !== book.id),
                reading: state.reading.concat([book])
            }));
        }
        if(type === 'ReadToWantRead'){
            this.setState((state) => ({
                read: state.read.filter(item => item.id !== book.id),
                wantToRead: state.wantToRead.concat([book])
            }));
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
                                {this.state.reading.map((book) => {
                                    return (
                                    <li key={book.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.previewLink}")` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select defaultValue="reading" onChange={(e) => this.ChangeBookStatus(book, e)}>
                                                        <option value="none" disabled>Move to...</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="ReadingToWantRead">Want to Read</option>
                                                        <option value="ReadingToRead">Read</option>
                                                        <option value="none">None</option>
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
                                {this.state.wantToRead.map(book => {
                                    return (
                                    <li key={book.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.previewLink}")` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select defaultValue="wantToRead" onChange={(e) => this.ChangeBookStatus(book, e)}>
                                                        <option value="none" disabled>Move to...</option>
                                                        <option value="WantReadToReading">Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="WantReadToRead">Read</option>
                                                        <option value="none">None</option>
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
                                {this.state.read.map(book => {
                                    return (
                                    <li key={book.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.previewLink}")` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select defaultValue="read" onChange={(e) => this.ChangeBookStatus(book, e)}>
                                                        <option value="none" disabled>Move to...</option>
                                                        <option value="ReadToReading">Currently Reading</option>
                                                        <option value="ReadToWantRead">Want to Read</option>
                                                        <option value="read">Read</option>
                                                        <option value="none">None</option>
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


