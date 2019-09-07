import React, { Component } from "react";
import Table from '../TableComponent';
import BooksEntryForm from '../../BooksEntryFormComponent';

class AccordionTable extends Component{

    state={
        editCategory: false,
        categoryData: {} 
    }

    renderTableHeader(){
        let {tableHeaderConfig} = this.props;
        return tableHeaderConfig.map((key, index) => {
           return <th key={`${index}-${key}`}>{key.toUpperCase()}</th>
        })
    }
    renderTableData(){
        let {tableBodyConfig,showBookList, isExpanded} = this.props;
        
        return tableBodyConfig.map(({category, bookList, key}, index) => {
            
            let subTableHeader = bookList.length > 0 && Object.keys(bookList[0]);

            subTableHeader = subTableHeader.filter((item)=>{
                if(item !=='key'){
                    return item;
                }
            })

            return (
               <React.Fragment key={`${category}-${bookList.length}`}>
                    <tr >
                        <td ><a title={category} onClick={(e)=>{showBookList(e, category)}}>{category}</a></td>
                        <td >{bookList.length}</td>
                        <td>
                            <button onClick={()=>{this.editBookForm({category,bookList})}}>Edit</button> 
                            <button onClick={()=>{this.props.deleteCategory(key)}}>Delete</button>
                        </td>
                    </tr>
                    {(isExpanded === category) && 
                        <tr>
                            { (bookList.length) ?
                            <td colSpan="3">
                                <Table
                                className="sub-table"
                                tableHeaderConfig = {subTableHeader}
                                tableBodyConfig = {bookList}
                                />
                            </td>
                            :
                            <td colSpan="3">
                                <span>No books available</span>
                            </td>
                            }
                        </tr>
                    }             
               </React.Fragment>
            )
         })
    }

    editBookForm(categoryData){
        this.setState({
            editCategory: true,
            categoryData
        })
    }
    updateBookData(newBookData){
        this.setState({
            editCategory: false
        });
        this.props.updateBookCategory(newBookData);
    }
    render(){
        const {className} = this.props; 
        const {editCategory, categoryData} = this.state;
        return (
            <React.Fragment>
            <table className={className}>
                <thead>
                    <tr>{this.renderTableHeader()}</tr>
                </thead>
                <tbody>
                    {this.renderTableData()}
                </tbody>
            </table>
            {editCategory && 
                <BooksEntryForm edit={true} categoryData={categoryData} updateBookCategory={(newBookData)=>{this.updateBookData(newBookData)}}/>
            }
            </React.Fragment>
        )
    }
}

export default AccordionTable;