import React from 'react'
import { connect } from 'react-redux'
import {sendVote,UP_VOTE_POST,DOWN_VOTE_POST} from '../actions/postActions'
import {sendVoteComment,UP_VOTE_COMMENT,DOWN_VOTE_COMMENT} from '../actions/commentActions'

const Votes = props => {

    function onVote (id,type,voteType) {
        if (voteType==='post'){
            props.sendVote(id,type==='UP'?UP_VOTE_POST:DOWN_VOTE_POST)
        } else if (voteType==='comment'){ 
            props.sendVoteComment(id,type==='UP'?UP_VOTE_COMMENT:DOWN_VOTE_COMMENT)
        }
    }

    const { id,voteScore, enableChange, voteType } = props

        return (    
            <div>
                <span className="w3-padding-large w3-right"><b>Votes  </b> <span className="w3-tag">{voteScore}</span></span>
                {
                    enableChange && (
                        <div>     
                            <p className="vote-up"> 
                                <button type='button' onClick={()=> onVote(id,'UP',voteType)} className="w3-button w3-padding-large w3-white w3-border w3-right"><b>up</b></button>
                            </p>
                            <p className="vote-down">
                                <button type='button' onClick={()=> onVote(id,'DOWN',voteType)} className="w3-button w3-padding-large w3-white w3-border w3-right"><b>down</b></button>
                            </p>
                        </div>
                    )
                }
            </div>
        )


}

export default connect(null,{sendVote,sendVoteComment})(Votes)