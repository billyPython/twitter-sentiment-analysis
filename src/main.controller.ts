import { Application } from 'express';
import { TwitterSentimentService } from './services/twitter.service';

export class Controller {
    private twitterSearchService: TwitterSentimentService;

    constructor(private app: Application) {
        this.twitterSearchService = new TwitterSentimentService();
        this.routes();
    }

    public routes() {
        this.app.route('/twitter_sentiment').get(
            async (req, res) => {
                res.status(200)
                    .send(await this.twitterSearchService.tweetSentimentAnalysis(req.query.q));
        });
    }
}
