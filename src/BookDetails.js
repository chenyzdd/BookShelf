import React from "react"
import * as BooksAPI from "./BooksAPI"


export class BookDetails extends React.Component{

    state = {
        bookInfo: {}
    };

    componentDidMount(){
        console.log(this.props.selectId)
        if(this.props.selectId){
            BooksAPI.get(this.props.selectId).then(bookInfo => {
                this.setState({bookInfo});
            })
        }
    }

    render(){
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>Details</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            { this.props.selectId === undefined &&
                            <h2 className="bookshelf-title">No selected book</h2>
                            }
                            { this.props.selectId !== undefined &&
                            <div>
                                <ul>
                                    <li>
                                        <div className="form-label">
                                            <label>Title</label>
                                        </div>
                                        <div>{this.state.bookInfo.title}</div>
                                    </li>
                                    <li>
                                        <div className="form-label">
                                            <label>subTitle</label>
                                        </div>
                                        <div>{this.state.bookInfo.subtitle}</div>
                                    </li>
                                    <li>
                                        <div className="form-label">
                                            <label>publishedDate</label>
                                        </div>
                                        <div>{this.state.bookInfo.publishedDate}</div>
                                    </li>
                                    <li>
                                        <div className="form-label">
                                            <label>previewLink</label>
                                        </div>
                                        <div>{this.state.bookInfo.previewLink}</div>
                                    </li>
                                    <li>
                                        <div className="form-label">
                                            <label>pageCount</label>
                                        </div>
                                        <div>{this.state.bookInfo.pageCount}</div>
                                    </li>
                                    <li>
                                        <div className="form-label">
                                            <label>infoLink</label>
                                        </div>
                                        <div>{this.state.bookInfo.infoLink}</div>
                                    </li>
                                    <li>
                                        <div className="form-label">
                                            <label>authors</label>
                                        </div>
                                        <div>{this.state.bookInfo.authors&&this.state.bookInfo.authors.map((author, index) => {
                                            if(index === 0){
                                                return author;
                                            }else{
                                                return '; ' + author;
                                            }
                                        })}</div>
                                    </li>
                                </ul>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}