import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import { BookShelf } from "./BookShelf"
import {SearchBook} from "./SearchBook"
import { BookDetails } from "./BookDetails"

export class BooksApp extends React.Component {

    state = {
        shelf: [],
        searchBookList: [],
        selectId: undefined,
    };

    changeShelf(shelf){
        this.setState({shelf: shelf});
    }

    changeSearchBookList(booklist){
        this.setState({searchBookList: booklist});
    }

    changeSelectId(selectId){
        this.setState({selectId})
    }

    render() {
        return(
            <div className="app">
                <Route path="/" exact render={ () => (
                    <BookShelf
                        changeSelectId={this.changeSelectId.bind(this)}
                        changeShelf={this.changeShelf.bind(this)}
                        { ...this.state }
                    />
                )}/>
                <Route path="/search" render={ () => (
                    <SearchBook
                        changeSelectId={this.changeSelectId.bind(this)}
                        changeShelf={this.changeShelf.bind(this)}
                        changeSearchBookList={this.changeSearchBookList.bind(this)}
                        { ...this.state }
                    />) }/>

                <Route path="/details" render={ () => (
                    <BookDetails
                        { ...this.state }
                    />) }/>
            </div>
        )
    }
}
