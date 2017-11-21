import React, { Component } from 'react'
import { connect } from 'react-redux'
import {sendVote,UP_VOTE_POST,DOWN_VOTE_POST} from '../actions/postActions'

class Votes extends Component {

    onVote = (postId,type) => {
        console.log(`This id ${postId} type ${type}`)
        this.props.sendVote(postId,type)
    }


    render() {

        const { postId,voteScore, enableChange } = this.props

        return (    
            <div>
                <span className="w3-padding-large w3-right"><b>Votes  </b> <span className="w3-tag">{voteScore}</span></span>
                {
                    enableChange && (
                     <p>    
                        <button type='button' onClick={()=> this.onVote(postId,UP_VOTE_POST)} className="w3-button w3-padding-large w3-white w3-border"><b>up</b></button>
                        <button type='button' onClick={()=> this.onVote(postId,DOWN_VOTE_POST)} className="w3-button w3-padding-large w3-white w3-border"><b>down</b></button>
                    </p>
                    )
                }
            </div>
        )
    }

}

export default connect(null,{sendVote})(Votes)