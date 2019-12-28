import { Request, Response } from "express";

export class GoogleNlpApiService {
    public welcomeMessage(req: Request, res: Response) {
        return res.status(200).send("Welcome to Google NLP Api service");
    }
}
