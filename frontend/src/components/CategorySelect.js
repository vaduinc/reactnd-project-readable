import React, { Component } from 'react'
import { connect } from 'react-redux'

class CategorySelect extends Component {

    render() {

        const { categories } = this.props.categories

        return (    
            <select name='category'>
                { categories && (
                    categories.map( (category) => (
                        <option key={category.name} value={category.name}>{category.name}</option>
                    ))
                )}    
            </select>
            
        )
    }

}

const mapStateToProps = ({ comments, posts, categories }) => ({
    categories
})

export default connect(mapStateToProps)(CategorySelect)