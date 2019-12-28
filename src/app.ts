import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { Controller } from './main.controller';


class App {
    //declaring our controller
    public Controller: Controller;
    public app: Application;
    
    constructor() {
        this.app = express();
        this.setConfig();

        //Creating and assigning a new instance of our controller
        this.Controller = new Controller(this.app);
    }

    private setConfig() {
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cors());
    }
}

export default new App().app;