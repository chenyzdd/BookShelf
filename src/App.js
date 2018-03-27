import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import { BookShelf } from "./BookShelf"
import {SearchBook} from "./SearchBook"
import * as BooksAPI from "./BooksAPI";

export class BooksApp extends React.Component {

    state = {
        shelf: [],
        searchBookList: []
    };

    componentDidMount(){
        this.changeShelf();
    }

    changeShelf(){
        BooksAPI.getAll().then(books => {
            if(books.constructor === Array){
                this.setState({shelf: books});
            }
        });
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
