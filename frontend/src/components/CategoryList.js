import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchCategories} from '../actions/categoryActions'

class CategoryList extends Component {

    componentDidMount() {
        this.props.fetchCategories()
    }

    render() {

        const { dataCollection } = this.props.categories
        
        return (    
            <div className="w3-col l2 ">
                <div className="w3-card w3-margin w3-light-grey">
                    <div className="w3-container w3-padding">
                        <h4>Categories</h4>
                        <p className='funnel-button'><button>Filter</button></p>
                    </div>
                    <hr/>
                    <ul className="w3-ul w3-hoverable">
                        { dataCollection && (
                            dataCollection.map( (category) => (
                                <li key={category.name} onClick={() => this.props.onChangeCategory(category.name) } className="w3-padding-16">
                                    <span className="w3-large">{category.name}</span>
                                </li>
                            ))    
                        )}    
                     </ul>
                </div>
            </div>

        )
    }

}

const mapStateToProps = ({ comments, posts, categories }) => ({
    categories
})

export default connect(mapStateToProps,{fetchCategories})(CategoryList)