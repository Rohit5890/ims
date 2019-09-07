import React from "react"

class BooksEntryForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            category: props.edit ? props.categoryData.category :"" ,
            bookList: props.edit ? props.categoryData.bookList: []
        }
    }
    
    handleFormChange(e){
        if(e.target.name.indexOf('category')>-1){
            this.setState({
                category: e.target.value
            })
        }else{
            const bookList = [...this.state.bookList];
            const {id:datasetId} = e.target.dataset;
            const {className:inputElem} = e.target;

            bookList[datasetId][inputElem] = inputElem === 'price' ? e.target.value >=0 && e.target.value !=="" ? parseInt(e.target.value,10):'': e.target.value.trim();
            this.setState({
                bookList
            })
        }
    }
    addBook(e){
        this.setState((prevState) => ({
            bookList: [...prevState.bookList, {title: "",price: 0}]
        }));
    }
    mergeArrayOfObjects = (original, newdata, selector = 'key') => {
        newdata.forEach(dat => {
            const foundIndex = original.findIndex(ori => ori[selector] == dat[selector]);
            if (foundIndex >= 0) original.splice(foundIndex, 1, dat);
            else original.push(dat);
        });
    
        return original;
    };
    handleFormSubmit(e){
        e.preventDefault();
        let {category, bookList} = this.state;
        let bookData = JSON.parse(localStorage.getItem('BookData'));
        let existingcat = false

        bookData.find((item)=>{
            if(item.category === category && !bookList.length){
                existingcat = true;
                return true;
            }else if(item.category === category && bookList.length){
                const newList = this.mergeArrayOfObjects(item.bookList, bookList, 'title');
                item.bookList = [...newList];
                existingcat = true;
            }
        });
            
        if(!existingcat){
            if(bookList.length > 0){ 
                let newTst = this.mergeArrayOfObjects([bookList[0]], bookList, 'title');
                const newState = {...this.state,...{bookList:newTst}};
                
                bookData = [...bookData, ...[newState]]
            }else {
                bookData = [...bookData, ...[this.state]]
            }
        }
        localStorage.setItem('BookData', JSON.stringify(bookData));
        this.props.updateBookCategory(bookData);
    }

    render() {
        const {bookList}= this.state;
        return (
            <div className="form-wrap">
                <div className="form-scroll">
                    <form onSubmit={(e)=>{this.handleFormSubmit(e)}} >
                    <fieldset>
                            
                        <legend htmlFor="category">Category</legend>
                        <input 
                            type="text" 
                            name={`${this.state.category}-category`} 
                            id={`${this.state.category}-category`} 
                            value={this.state.category} 
                            onChange={(e)=>{this.handleFormChange(e)}}
                        />
                        <button type="button" onClick={(e)=>{this.addBook(e)}}>Add new book</button>
                        </fieldset>
                        
                        {bookList && 
                            <fieldset>
                            <legend htmlFor="books">Books</legend>{
                            bookList.map(({title, price}, index)=>{
                                const bookId = `book-${index}`;
                                const priceId = `price-${index}`;
                                return (
                                    
                                    <div key={`bookDetail-${index}`}>
                                        <fieldset>
                                            <legend htmlFor={bookId}>Book Title</legend>
                                            <input
                                            type="text"
                                            placeholder="Book Title"
                                            name={bookId}
                                            data-id={index}
                                            id={bookId}
                                            className="title"
                                            value= {bookList[index].title}
                                            onChange={(e)=>{this.handleFormChange(e)}}
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <legend htmlFor={priceId}>Book Price</legend>
                                            <input
                                            type="text"
                                            name={priceId}
                                            data-id={index}
                                            id={priceId}
                                            className="price"
                                            value={bookList[index].price}
                                            onChange={(e)=>{this.handleFormChange(e)}}
                                        />
                                        </fieldset>
                                    </div>
                                
                                )

                            })
                            }
                            </fieldset>
                        }
                        
                        <input type="submit" value="Submit" /> 
                    </form>
                </div>
            </div>
        )
    }
}
export default BooksEntryForm;