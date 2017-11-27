import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchCategories} from '../actions/categoryActions'

class CategorySelect extends Component {

    componentDidMount() {
        this.props.fetchCategories()
    }

    changeSelection = (e) => {
        this.props.changeCategory(e.target.value)
    }

    render() {

        const { dataCollection } = this.props.categories
        const { addEmpty } = this.props
        const data = dataCollection ||[]

        return (  
            <div className="category-changer" >  
                <select onChange={(e) => this.changeSelection(e)} value={this.props.selectedCategory?this.props.selectedCategory:''} name='category' >
                    { 
                        data.map( (category) => (
                            <option   key={category.name} value={category.name}>{category.name}</option>
                        ))
                    }    
                    { addEmpty && (
                            <option key='none' value=''>none</option>
                    )}
                </select>
            </div>
        )
    }

}

const mapStateToProps = ({ comments, posts, categories }) => ({
    categories
})

export default connect(mapStateToProps,{fetchCategories})(CategorySelect)