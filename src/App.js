import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import { BookShelf } from "./BookShelf"
import {SearchBook} from "./SearchBook"

export class BooksApp extends React.Component {

    state = {
        shelf: [],
        searchBookList: []
    };

    changeShelf(shelf){
        this.setState({shelf: shelf});
    }

    changeSearchBookList(booklist){
        this.setState({searchBookList: booklist});
    }

    render() {
        return(
            <div className="app">
                <Route path="/" exact render={ () => (
                    <BookShelf
                        changeShelf={this.changeShelf.bind(this)}
                        { ...this.state }
                    />
                )}/>
                <Route path="/search" render={ () => (
                    <SearchBook
                        changeShelf={this.changeShelf.bind(this)}
                        changeSearchBookList={this.changeSearchBookList.bind(this)}
                        { ...this.state }
                    />) }/>

            </div>
        )
    }
}
