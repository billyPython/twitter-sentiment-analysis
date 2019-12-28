import { Application } from 'express';
import { TwitterSearchService } from './services/twitter.service';

export class Controller {
    private twitterSearchService: TwitterSearchService;

    constructor(private app: Application) {
        this.twitterSearchService = new TwitterSearchService();
        this.routes();
    }

    public routes() {
        this.app.route('/twitter_search').get( (req, res) => {
            res.status(200).send(this.twitterSearchService.welcomeMessage());    
        });
    }
}
