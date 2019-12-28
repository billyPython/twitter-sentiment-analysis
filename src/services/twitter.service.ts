import { Request, Response } from "express";

export class TwitterSearchService {
  public welcomeMessage(req: Request, res: Response) {
    return res.status(200).send("Welcome to Twitter search service");
  }
}
