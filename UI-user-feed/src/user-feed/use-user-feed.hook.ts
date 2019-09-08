import { useReducer } from 'react';
import { TweetModel } from './user-feed.component';

export enum TweetActions {
  LIKE = 'LikeTweetAction',
  ADD = 'AddTweetAction',
}

interface UserFeedHook {
  dispatch: React.Dispatch<any>;
  tweets: TweetModel[];
}

export const useUserFeed = (initialUserFeed: any): UserFeedHook => {
  const reducer:React.Reducer<TweetModel[], any> = (tweets: TweetModel[], action: any): TweetModel[] => {
    switch (action.type) {
      case TweetActions.LIKE:
        return tweets.map((tweet: TweetModel): TweetModel =>
          tweet.timestamp === action.payload
          ? {
            ...tweet,
            likes: tweet.likes + 1,
          } : tweet
        );
      case TweetActions.ADD: {
        return [...tweets, action.payload];
      }
      default: return tweets;
    }
  };

  const formatData = (data: any): TweetModel[] => {
    return data.feed.map((feedItem: any): TweetModel => ({
      value: feedItem.value,
      id: feedItem.id,
      user: feedItem.user,
      likes: +feedItem.likes,
      timestamp: +feedItem.timestamp,
      timeZoneOffset: +feedItem.timeZoneOffset,
    }));
  };

  const [tweets, dispatch] = useReducer<React.Reducer<TweetModel[], any>>(reducer, formatData(initialUserFeed));

  return { tweets, dispatch };
};
