import Twitter from 'twitter';

export const TWITTER_KEY = 'key';
export const TWITTER_SECRET_KEY = 'secret key';
export const TWITTER_ACCESS_TOKEN = 'token';
export const TWITTER_ACCESS_TOKEN_SECRET = 'secret token';

export const clientTwitter = new Twitter({
    consumer_key: TWITTER_KEY,
    consumer_secret: TWITTER_SECRET_KEY,
    access_token_key: TWITTER_ACCESS_TOKEN,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
});
