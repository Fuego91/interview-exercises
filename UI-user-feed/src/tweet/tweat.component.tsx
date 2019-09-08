import * as React from 'react';
import { TweetModel } from "../user-feed/user-feed.component";
import './tweet.component.scss';

interface TweetProps {
  tweet: TweetModel;
  onLikeClick: (timestamp: number) => void;
}

const Tweet = ({tweet, onLikeClick}: TweetProps): JSX.Element => (
  <div key={tweet.timestamp} className="tweet">
    <span className="text">{tweet.value}</span>
    <hr />
    <div className="tweet-footer">
      <div className="creation-info">
        <span className="user-name">{tweet.user}</span>
        <span className="creation-date">{new Date(tweet.timestamp).toDateString()}</span>
      </div>
      <span className="rating">{tweet.likes}</span>
      <button
        className="like-btn"
        onClick={() => onLikeClick(tweet.timestamp)}
        >
        &#10084;
      </button>
    </div>
  </div>
);

export default Tweet;