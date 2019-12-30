import {clientTwitter} from '../constants/twitterSearchApi.constants';
import {clientGNLP} from '../constants/googleCloudNlpAPI.constants';


export class TwitterSentimentService {

  public async tweetSentimentAnalysis(searchTerm: string) {
    const searchResult = await clientTwitter.get(
        'search/tweets', {q: searchTerm, count: 10, language: 'en'},
    );

    const tweetSentimentResults: {
      sentimentAverage: number, result: Array<{ tweet: string, sentimentScore: number }>,
    } = {sentimentAverage: 0, result: []};

    const promises = searchResult.statuses.map( (tweet) => {
        return clientGNLP.analyzeSentiment(
          {document: {content: tweet.text, type: 'PLAIN_TEXT'}});
    });

    let sentimentResult: any;
    sentimentResult = await Promise.all(promises).catch( (err) => {
      console.log(err);
    });

    tweetSentimentResults.result = searchResult.statuses.map((item, index) => {
      return {
        tweet: item.text,
        sentimentScore: sentimentResult[index][0].documentSentiment.score,
      };
    });

    tweetSentimentResults.sentimentAverage = tweetSentimentResults.result
        .reduce((acc, val) => {
          return acc + val.sentimentScore; }, 0);

    return tweetSentimentResults;

  }

}
