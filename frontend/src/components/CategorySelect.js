import React, { Component } from 'react'
import { connect } from 'react-redux'

class CategorySelect extends Component {

    render() {

        const { categories } = this.props.categories

        return (    
            <select name='category'>
                { categories && (
                    categories.map( (category) => (
                        <option value={category.name}>{category.name}</option>
                    ))
                )}    
            </select>
            
        )
    }

}

const mapStateToProps = ({ posts, categories }) => ({
    categories
})

export default connect(mapStateToProps)(CategorySelect)