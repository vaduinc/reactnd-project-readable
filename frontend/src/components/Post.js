import React, { Component } from 'react'
import {savePost} from '../actions/postActions'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CategorySelect from './CategorySelect'

class Post extends Component {

    handleSubmit = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        console.log(values)
        this.props.savePost(values)

        // if (this.props.onSavedPost){
        //   this.props.onSavedPost(true)
        // }  
      }


    render() {

        const { reading } = this.props

        return (    
            <div className="w3-card-4 w3-margin w3-white">
                <form onSubmit={this.handleSubmit} >
                    <div className="w3-container">
                        <div className="w3-row">
                            <div className="w3-col m8 s12">
                                {reading?<h3><b>TITLE HEADING</b></h3>:<input name="title" type='text'
                                placeholder='post title' className="w3-simple-input" /> }
                            </div> 
                            <div className="w3-col m4 s12">
                                <CategorySelect />
                            </div>          
                        </div>            
                        {reading?<h5>Author, <span className="w3-opacity">April 7, 2014</span></h5>:<input name="author" type='text'
                        placeholder='author' className="w3-simple-input" /> }
                    </div>

                    <div className="w3-container">
                        {reading?
                            <p>Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sed
                            tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
                        :<textarea name="body" 
                        placeholder='body content' className="w3-simple-input" /> }
                        <div className="w3-row">
                            <div className="w3-col m8 s12">
                                <p><button className="w3-button w3-padding-large w3-white w3-border"><b>SAVE POST »</b></button></p>
                            </div>
                            <div className="w3-col m4 w3-hide-small">
                                <p><span className="w3-padding-large w3-right"><b>Comments  </b> <span className="w3-tag">0</span></span></p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}

 
export default withRouter(connect(null, { savePost })(Post))