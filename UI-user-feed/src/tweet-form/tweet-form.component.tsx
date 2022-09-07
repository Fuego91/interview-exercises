import * as React from 'react';
import './tweet-form.component.scss';
import { TweetModel } from '../user-feed/user-feed.component';
import { useTweetForm } from './tweet-form.hook';

interface TweetFormProps {
  onAddTweetClick: (tweet: TweetModel) => void;
}

const TweetForm = ({onAddTweetClick} : TweetFormProps) => {
  const {newTweat, resetTweet, setNewTweat} = useTweetForm();

  const handleAddTweetClick = () => {
    onAddTweetClick(newTweat);
    resetTweet();
  };

  const handleNewTweetUpdate = (
    ev: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    setNewTweat({
      ...newTweat,
      value: ev.currentTarget.value,
    })
  };

  return (
    <div className="tweet-form">
      <button
        className="add-tweet-btn"
        onClick={handleAddTweetClick}
        disabled={!newTweat.value}
        >
        &#43;
      </button>
      <input
        type="text"
        placeholder="Input your tweet text"
        className="new-tweet-input"
        value={newTweat.value || ''}
        onChange={handleNewTweetUpdate}
      />
    </div>
  );
};

export default TweetForm;