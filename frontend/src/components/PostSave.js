import React, { Component } from 'react'
import {savePost,updatePost} from '../actions/postActions'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux';
import { withRouter , Link} from 'react-router-dom';
import CategorySelect from './CategorySelect'
import Votes from './Votes'
import AlertContainer from 'react-alert'
import {alertOptions} from '../utils/msgUtil'


class PostSave extends Component {

    constructor(props) {
        super(props)
        this.state = {
          cat: undefined
        }
     }

    changeCategory = (newValue) => {
        this.setState({
            cat : newValue
        })
    } 

    handleSubmit = (e) => {
        e.preventDefault()

        this.msg.show('Saving data...', {
            time: 1000,
            type: 'success'
          })

        const values = serializeForm(e.target, { hash: true })
        if (this.props.action==='add'){
            this.props.savePost(values)
                .then( () => this.goPostEdit(values.id))
        }else if (this.props.action==='edit'){
            values.id = this.props.match.params.postId
            this.props.updatePost(values)
        }    
    }

    goPostEdit(id) {
        this.props.history.push(`/postSave/edit/${id}`)
      }

    
    render() {
        const { postId } = this.props.match.params
        const { action } = this.props
        const { dataCollection } = this.props.posts

        let currentPost 
        if (action==='edit' && dataCollection){
           currentPost = dataCollection.filter( (item) => item.id===postId)[0]
        } 
        
        return (    
            <div className="w3-card-4 w3-margin w3-white">
                { !dataCollection &&(
                    <h2 className="w3-left">
                        There was an issue loading this form. Click the home button, and try it again.
                        <p className="home-button"><Link to={'/'} >Home</Link></p>  
                    </h2>  
                )}

                { dataCollection &&(
                    <div>
                        <AlertContainer ref={a => this.msg = a} {...alertOptions} />
                        <form onSubmit={this.handleSubmit} >
                            <div className="w3-container">
                                <div className="w3-row">
                                    <div className="w3-col m12 s12">
                                        <h3 className="w3-text-orange" >POST {action}</h3>
                                    </div>          
                                </div>    
                                <div className="w3-row">
                                    <div className="w3-col m6 s12">
                                        <input name="title" type='text' defaultValue={currentPost?currentPost.title:''} placeholder='post title' className="w3-input" />
                                    </div> 
                                    <div className="w3-col m4 ">
                                        <input name="author" type='text' defaultValue={currentPost?currentPost.author:''} placeholder='author' className="w3-input" />
                                    </div>     
                                    <div className="w3-col m2 w3-right">
                                        <CategorySelect changeCategory={this.changeCategory} selectedCategory={this.state.cat?this.state.cat:(currentPost?currentPost.category:'')} />
                                    </div>          
                                </div>  
                                <div className="w3-row">  
                                    <div className="w3-col m12 s12">
                                        <textarea name="body" defaultValue={currentPost?currentPost.body:''}  placeholder='body content' className="w3-input" />
                                    </div>    
                                </div>
                                <div className="w3-row">
                                    <div className="w3-col m1 s12">
                                        <p className="home-button">
                                            <Link to={'/'} >Home</Link>
                                        </p>
                                    </div>
                                    {action!=='add' && (
                                        <div className="w3-col m1">
                                            <p className="return-link">
                                                <Link to={`/post/${postId}`} >Details</Link>
                                            </p>
                                        </div>
                                    )}
                                    <div className="w3-col m1">
                                        <p className="save-button">    
                                            <button type="submit" className="w3-button w3-padding-large w3-white w3-border">Save</button>
                                        </p>
                                    </div>
                                    <div className="w3-col m9 w3-hide-small">
                                        <Votes enableChange={false} postId={currentPost?currentPost.id:0}  voteScore={currentPost?currentPost.voteScore:0}/>
                                    </div>
                                </div>
                            </div>
                        </form>
                     </div>
                )}
            </div>
        )
    }

}

const mapStateToProps = ({ comments, posts, categories }) => ({
    posts
})
 
const mapDispatchToProps = (dispatch)  => (
        {
            savePost:   (values) => dispatch(savePost(values)),
            updatePost: (values) => dispatch(updatePost(values))
        }
    )

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostSave))