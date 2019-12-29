import Twitter from 'twitter';

export const TWITTER_KEY = 'GrV3FRnJsetQcG4MgXvEuZDMG';
export const TWITTER_SECRET_KEY = 'IhkwSs0U9UP1lPm4pU143SIoLNGu5H2ZGL5OOgIhOmXxYPdYMB';
export const TWITTER_ACCESS_TOKEN = '1211078127599812610-Fe9MatuBXTHfAHeJfdR563E408Lj3J';
export const TWITTER_ACCESS_TOKEN_SECRET = 'wwlTUl9VwieBy0cJwVe2TFG0Ybfixt9lHoQKTp9s4vtj9';

export const clientTwitter = new Twitter({
    consumer_key: TWITTER_KEY,
    consumer_secret: TWITTER_SECRET_KEY,
    access_token_key: TWITTER_ACCESS_TOKEN,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
});
