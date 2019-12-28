import { Application } from 'express';
import { TwitterSearchService } from './services/twitter.service';
import { GoogleNlpApiService } from './services/google.service';

export class Controller {
    private twitterSearchService: TwitterSearchService;
    private googleNlpApi: GoogleNlpApiService;

    constructor(private app: Application) {
        this.twitterSearchService = new TwitterSearchService();
        this.googleNlpApi = new GoogleNlpApiService();
        this.routes();
    }

    public routes() {
        this.app.route('/twitter_search').get(this.twitterSearchService.welcomeMessage);
        this.app.route('/google_nlp').get(this.googleNlpApi.welcomeMessage);
    }
}
