import { clientTwitter } from '../constants/twitterSearchApi.constants';
import { clientGNLP } from '../constants/googleCloudNlpAPI.constants';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

interface ISentimentResult {
  tweet: string;
  sentimentScore: number;
}

export class TwitterSentimentService {

  public async tweetSentimentAnalysis(searchTerm: string) {
    try {
      const searchResult = await clientTwitter.get(
          'search/tweets', {q: searchTerm, count: 10},
      );

      const tweetSentimentResults: Array<{ tweet: string, sentimentScore: number }> = [];

      const parseSearchResult = async () => {
        await asyncForEach(searchResult.statuses, async (item) => {
          const [result] = await clientGNLP.analyzeSentiment(
              { document: {content: item.text, type: 'PLAIN_TEXT'} },
          );
          tweetSentimentResults.push({
            tweet: item.text,
            sentimentScore: result.documentSentiment,
          });
        });
      };

      return parseSearchResult();

    } catch (e) {
      console.log(e);
    }
  }
}
