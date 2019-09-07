import React, {Component} from 'react';
import getApiResponse from '../../Utils/ApiRequest';
import AccordionTable from '../../components/common/AccordionTableComponent';
import BooksEntryForm from '../../components/BooksEntryFormComponent';


class BookLibrary extends Component{
    constructor(props){
        super(props);

        this.state = {
            expandCategory:''
        }
    }

    async componentDidMount(){
        const reqHeaders = {
            "content-type": "application/json"
        };
        const dataUrl = './APIs/bookListData.json';
        const method = 'GET'
        let tableData = await getApiResponse(method, dataUrl,'', reqHeaders);
        tableData = tableData.map((item,index)=>{
            item.key = `${new Date().getTime()}-${index}`;
            return item;
        })

        localStorage.setItem('BookData', JSON.stringify(tableData))

        this.setState({
            categoryDataConfig: tableData,
            categoryheaderConfig: ["Category Name", "Total Books","Actions"]
        });
    }

    updateBookCategory(newBookData){
        this.setState({
            categoryDataConfig:newBookData,
            openBookForm: false
        })

    }

    deleteCategory(key){
        
        let currData = JSON.parse(localStorage.getItem('BookData'));
        
        currData = currData.filter((item)=>{
            if(item.key !== key){
                return item;
            }
        })

        localStorage.setItem('BookData', JSON.stringify(currData));
        this.setState({
            categoryDataConfig: currData
        });
    }

    
    showBookList(e, categoryName){
        this.setState({
            expandCategory: categoryName
        })
    }

    openBookFormModal(){
        this.setState({
            openBookForm: true
        })
    }

    render(){

        const {categoryheaderConfig,categoryDataConfig, expandCategory, openBookForm} = this.state;

        return (
            <div className="book-lib">
                <button onClick={(e)=>{this.openBookFormModal(e)}}>Add New Category</button>
               {(categoryheaderConfig && categoryDataConfig) &&<AccordionTable
                className="accordian-table"
                tableHeaderConfig = {this.state.categoryheaderConfig}
                tableBodyConfig = {this.state.categoryDataConfig}
                showBookList= {(e,categoryName)=>{this.showBookList(e, categoryName)}}
                isExpanded={expandCategory}
                deleteCategory={(key)=>{this.deleteCategory(key)}}
                updateBookCategory= {(newBookData)=>{this.updateBookCategory(newBookData)}}
               />
               }
               {openBookForm && <BooksEntryForm edit={false} categoryData={[]}updateBookCategory= {(newBookData)=>{this.updateBookCategory(newBookData)}}/>}

            </div>
        )
    }
}

export default BookLibrary;