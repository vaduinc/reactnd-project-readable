import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchCategories} from '../actions/categoryActions'

class CategoryList extends Component {

    componentDidMount() {
        this.props.fetchCategories()
    }

    render() {

        const { categories } = this.props.categories
        
        console.log(this.props)

        return (    
            <div className="w3-col l3">
                <div className="w3-card w3-margin">
                    <div className="w3-container w3-padding">
                        <h4>Categories</h4>
                    </div>
                    <hr/>
                    <ul className="w3-ul w3-hoverable w3-white">
                        { categories && (
                            categories.map( (category) => (
                                <li key={category.name} onClick={() => this.props.onChangeCategory(category.name) } className="w3-padding-16">
                                    <span className="w3-large">{category.name}</span><br/>
                                </li>
                            ))    
                        )}    
                     </ul>
                </div>
            </div>

        )
    }

}

const mapStateToProps = ({ posts, categories }) => ({
    categories
})

export default connect(mapStateToProps,{fetchCategories})(CategoryList)