import express, {Application} from 'express';
import {TwitterSentimentService} from './services/twitter.service';

import asyncHandler from 'express-async-handler';

export class Controller {
    private twitterSearchService: TwitterSentimentService;

    constructor(private app: Application) {
        this.twitterSearchService = new TwitterSentimentService();
        this.routes();
    }

    public routes() {
        this.app.use('/', express.static('public'));
        this.app.get('/twitter_sentiment',
            asyncHandler(async (req, res, next) => {
                if (req.query.q === '' || req.query.q === null) {
                    res.status(400).send('Query parameter `q` is missing!');
                } else {
                    await this.twitterSearchService.tweetSentimentAnalysis(req.query.q)
                        .then((result) => {
                            res.status(200).json(result);
                        })
                        .catch((error) => {
                            res.status(500).send(error);
                        });
                }
        }));
    }
}
