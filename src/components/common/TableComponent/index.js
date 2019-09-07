import React, { Component } from "react";

class Table extends Component{

    renderTableHeader(){
        let {tableHeaderConfig} = this.props;
        return tableHeaderConfig.map((key, index) => {
           return <th key={`${index}-${key}`}>{key.toUpperCase()}</th>
        })
    }
    renderTableData(){
        let {tableBodyConfig} = this.props;
        return tableBodyConfig.map((item, index) => {
            item.key = `${new Date().getTime()}-${index}-${item.title}`;

            return (
               <React.Fragment key={`${item.title}-${item.price}`}>
                    <tr>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                    </tr>            
               </React.Fragment>
            )
         })
    }
    render(){
        const {className} = this.props;

        return (
            <table className={className}>
                <thead>
                    <tr>{this.renderTableHeader()}</tr>
                </thead>
                <tbody>
                    {this.renderTableData()}
                </tbody>
            </table>
        )
    }
}

export default Table;