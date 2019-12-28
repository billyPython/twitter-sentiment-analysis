import mongoose, { Schema, Document } from 'mongoose';

// start region SearchTerm
interface ISearchTerm extends Document{
    searchTerm: string;
}

const SearchTermSchema: Schema = new Schema({
    searchTerm: { type: String, required: true, unique: true },
});

const SearchTerm = mongoose.model<ISearchTerm>('SearchTerm', SearchTermSchema);
// endregion

// start region Tweets
interface ITweet extends Document {
    tweet: string;
    sentimentScore: number;
    sentimentScoreAverage: number;
}

const TweetSchema: Schema = new Schema({
    tweet: {type: String, required: true},
    sentimentScore: {type: Number, required: true},
    sentimentScoreAverage: {type: Number, required: true},
});

const Tweet = mongoose.model<ITweet>('Tweet', TweetSchema);
// endregion


export { SearchTerm, Tweet }