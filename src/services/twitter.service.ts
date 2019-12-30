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

    for (const item of searchResult.statuses) {
      try {
        let [result] = await clientGNLP.analyzeSentiment(
            {document: {content: item.text, type: 'PLAIN_TEXT'}},
        );
        tweetSentimentResults.result.push({
          tweet: item.text,
          sentimentScore: result.documentSentiment.score,
        });
      } catch (e) {
        console.log(e);
      }
    }

    tweetSentimentResults.sentimentAverage = tweetSentimentResults.result
        .reduce((acc, val) => {
          return acc + val.sentimentScore; }, 0);

    return tweetSentimentResults;

  }

}
