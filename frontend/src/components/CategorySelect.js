import React, { Component } from 'react'
import { connect } from 'react-redux'

class CategorySelect extends Component {

    render() {

        const { dataCollection } = this.props.categories

        return (    
            <select name='category' className='w3-select' >
                { dataCollection && (
                    dataCollection.map( (category) => (
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