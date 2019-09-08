import { useState } from "react";
import { TweetModel } from "../user-feed/user-feed.component";

export const getBlankTweet = () => ({
  user: 'You',
  id: new Date().getTime(),
  likes: 0,
  timestamp: new Date().getTime(),
  timeZoneOffset: new Date().getTimezoneOffset(),
  value: '',
});

export const useTweetForm = () => {
  const [newTweat, setNewTweat] = useState<TweetModel>(getBlankTweet());

  const resetTweet = () => setNewTweat(getBlankTweet());

  return {
    newTweat,
    resetTweet,
    setNewTweat,
  };
};
