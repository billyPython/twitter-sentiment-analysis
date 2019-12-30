import {Application} from 'express';
import {TwitterSentimentService} from './services/twitter.service';

import asyncHandler from 'express-async-handler';

export class Controller {
    private twitterSearchService: TwitterSentimentService;

    constructor(private app: Application) {
        this.twitterSearchService = new TwitterSentimentService();
        this.routes();
    }

    public routes() {
        this.app.get('/twitter_sentiment',
            asyncHandler(async (req, res, next) => {
                await this.twitterSearchService.tweetSentimentAnalysis(req.query.q)
                    .then((result) => {
                        res.status(200).json(result);
                    })
                    .catch((error) => {
                        res.status(500).send(error);
                    });
        }));
    }
}
