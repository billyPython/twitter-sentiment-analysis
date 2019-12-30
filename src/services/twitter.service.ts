import {clientTwitter} from '../constants/twitterSearchApi.constants';
import {clientGNLP} from '../constants/googleCloudNlpAPI.constants';


export class TwitterSentimentService {

  public async tweetSentimentAnalysis(searchTerm: string) {
    const searchResult = await clientTwitter.get(
        'search/tweets', {q: searchTerm, count: 10, language: 'en'},
    );

    const tweetSentimentResults: {
      sentimentAverage: number, results: Array<{ tweet: string, sentimentScore: number }>,
    } = {sentimentAverage: 0, results: []};

    const promises = searchResult.statuses.map( (tweet) => {
        return clientGNLP.analyzeSentiment(
          {document: {content: tweet.text, type: 'PLAIN_TEXT'}}).catch( (err) => {
            return err;
        });
    });

    await Promise.all(promises)
        .then( (values: any) => {
          const results = searchResult.statuses.map((item, index) => {
            if ( !(values[index] instanceof Error) ) {
              return {
                tweet: item.text,
                sentimentScore: values[index][0].documentSentiment.score,
              };
            } else {
                return {
                    tweet: item.text,
                    sentimentScore: values[index],
                };
            }
          });

          tweetSentimentResults.results = results.filter( (item) => {
             return !(item.sentimentScore instanceof Error);
          });

          tweetSentimentResults.sentimentAverage = tweetSentimentResults.results
              .reduce((acc, val) => {
                return acc + val.sentimentScore; }, 0);
        })
        .catch( (err) => {
          console.log(err);
        });

    return tweetSentimentResults;

  }

}
