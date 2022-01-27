// Write your code here
import './index.css'

import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails} = props
  const {name, comment, id, isLiked, initialClassName, date} = commentDetails

  const nameInitial = name ? name[0].toUpperCase() : ''
  const likedTextClassName = isLiked ? 'button active' : 'button'

  const likedImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const postedTime = formatDistanceToNow(date)

  const onLike = () => {
    const {toggleLiked} = props
    toggleLiked(id)
  }

  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  return (
    <li className="list-container">
      <div className="initial-name-time">
        <div className={initialClassName}>
          <p className="initial">{nameInitial}</p>
        </div>
        <div>
          <div className="username-time-container">
            <p className="username">{name}</p>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="like-delete-container">
        <div className="like-container">
          <img src={likedImage} className="like-image" alt="like" />
          <button className={likedTextClassName} type="button" onClick={onLike}>
            Like
          </button>
        </div>
        <button
          className="button"
          type="button"
          onClick={onDeleteComment}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
