import React, { Component } from 'react'
import { connect } from 'react-redux'
import {sendVote,UP_VOTE_POST,DOWN_VOTE_POST} from '../actions/postActions'
import {sendVoteComment,UP_VOTE_COMMENT,DOWN_VOTE_COMMENT} from '../actions/commentActions'

class Votes extends Component {

    onVote = (id,type,voteType) => {
        console.log(`This id ${id} type ${type} -- vote type ${voteType}`)
        if (voteType==='post'){
            this.props.sendVote(id,type==='UP'?UP_VOTE_POST:DOWN_VOTE_POST)
        } else if (voteType==='comment'){ 
            this.props.sendVoteComment(id,type==='UP'?UP_VOTE_COMMENT:DOWN_VOTE_COMMENT)
        }
    }


    render() {

        const { id,voteScore, enableChange, voteType } = this.props

        return (    
            <div>
                <span className="w3-padding-large w3-right"><b>Votes  </b> <span className="w3-tag">{voteScore}</span></span>
                {
                    enableChange && (
                     <p>    
                        <button type='button' onClick={()=> this.onVote(id,'UP',voteType)} className="w3-button w3-padding-large w3-white w3-border w3-right"><b>up</b></button>
                        <button type='button' onClick={()=> this.onVote(id,'DOWN',voteType)} className="w3-button w3-padding-large w3-white w3-border w3-right"><b>down</b></button>
                    </p>
                    )
                }
            </div>
        )
    }

}

export default connect(null,{sendVote,sendVoteComment})(Votes)