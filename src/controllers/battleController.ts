import { Request, Response } from "express";
import { startBattle } from "../services/battleService";

export async function starBattle(req: Request, res: Response){
   
        console.log(req.body);
        const {firstUser, secondUser}: {firstUser: string, secondUser:string} = req.body;
        const battleResults = await startBattle(firstUser , secondUser);
        res.status(200).send(battleResults);

   


}