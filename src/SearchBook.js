import React from "react"
import { Link } from "react-router-dom"
import * as BooksAPI  from "./BooksAPI"

export class SearchBook extends React.Component{

    state = {
       filter: undefined
    };

    componentDidMount(){
        this.props.changeSearchBookList([]);
    }

    searchBooks(e){
        this.setState({filter: e.target.value});
        BooksAPI.search(e.target.value).then(response => {
            if(response.constructor === Array) {
                let list = response.map(book => {
                    let res = this.props.shelf.filter(shelfbook => book.id === shelfbook.id);
                    if (res.length > 0) {
                        book.shelf = res[0].shelf;
                    } else {
                        book.shelf = "none";
                    }
                    return book;
                });
                this.props.changeSearchBookList(list);
            }
        })
    }

    ChangeBookStatus(book, e){
        let type = e.target.value;
        BooksAPI.update(book, type).then((response) => {
            BooksAPI.search(this.state.filter).then((bookList) => {
                if(bookList.constructor === Array) {
                    this.props.changeSearchBookList(bookList);
                }
            })
        });
    }

    render(){
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search"/>
                    <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onInput={(e) => this.searchBooks(e)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.searchBookList.map((book) => {
                            return (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks && book.imageLinks.thumbnail}")` }}></div>
                                            <div className="book-shelf-changer">
                                                <select defaultValue={book.shelf === undefined ? 'none' : book.shelf} onChange={(e) => this.ChangeBookStatus(book, e)}>
                                                    <option value="none" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
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
        )
    }
}