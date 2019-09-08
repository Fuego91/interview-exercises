import * as React from 'react';
import './user-feed.component.scss';
import mock from './data.json';
import Tweet from '../tweet/tweat.component';
import TweetForm from '../tweet-form/tweet-form.component';
import { useUserFeed, TweetActions } from './use-user-feed.hook';

export interface TweetModel {
  value: string;
  id: number;
  user: string;
  likes: number;
  timestamp: number;
  timeZoneOffset: number;
}

const UserFeed = (): JSX.Element => {
  const { tweets, dispatch } = useUserFeed(mock);

  const handleLikeClick = (timestamp: number): void => dispatch({type: TweetActions.LIKE, payload: timestamp});
  const handleAddTweetClick = (tweet: TweetModel): void => {
    dispatch({
      type: TweetActions.ADD,
      payload: tweet,
    });
  };

  return (
    <div className="user-feed">
      <div className="feed-header">
        <TweetForm onAddTweetClick={handleAddTweetClick} />
        <span className="tweets-amount">{tweets.length}</span>
      </div>
      {tweets.map((tweet: TweetModel): JSX.Element =>
      <Tweet
        key={tweet.timestamp}
        tweet={tweet}
        onLikeClick={handleLikeClick} />
      )}
    </div>
  )
};

export default UserFeed;
