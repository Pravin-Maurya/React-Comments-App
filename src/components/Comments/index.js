import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentList: [],
  }

  deleteComment = id => {
    const {commentList} = this.state

    this.setState({
      commentList: commentList.filter(comment => comment.id !== id),
    })
  }

  toggleLiked = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentList = () => {
    const {commentList} = this.state
    return commentList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleLiked={this.toggleLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  onCommentInput = event => {
    this.setState({
      commentInput: event.target.value,
    })
  }

  render() {
    const {nameInput, commentInput, commentList} = this.state

    return (
      <div className="app-container">
        <div className="comment-input-container">
          <h1 className="heading">Comments</h1>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="say-something">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="name-input"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onNameInput}
              />
              <textarea
                placeholder="Your Comment"
                className="comment-input"
                value={commentInput}
                onChange={this.onCommentInput}
                rows="6"
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comment-img"
            />
          </div>
          <hr className="horizontal-line" />
          <p className="comment">
            <span className="count-comment">{commentList.length}</span>Comments
          </p>
          <ul className="comment-list">{this.renderCommentList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
