import express, {Application} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {Controller} from './main.controller';


class App {
    // declaring our controller
    public Controller: Controller;
    public app: Application;

    constructor() {
        this.app = express();
        this.setConfig();
        // this.setupDb();

        // Creating and assigning a new instance of our controller
        this.Controller = new Controller(this.app);
    }

    private setConfig() {
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cors());
    }
    // If DB init is needed
    // private setupDb(): void {
    //     const mongoDb = 'mongodb://127.0.0.1/twitter_sentiment_analysis';
    //     mongoose.connect(mongoDb);
    //     const db = mongoose.connection;
    //     db.on('error', console.error.bind(console, 'MongoDB Connection error'));
    //   }
}

export default new App().app;
