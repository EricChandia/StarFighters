import axios from "axios";
import { battleRepository } from "../repositories/battleRepository";

export async function startBattle(firstUser: string, secondUser: string){
    
    const firstUserStars = await (await axios.get(`https://api.github.com/users/${firstUser}/repos`)).data.stargazers_count;

    if(!firstUserStars){
        return { };
    }

    const secondUserStars = await (await axios.get(`https://api.github.com/users/${firstUser}/repos`)).data.stargazers_count;

    if(!secondUserStars){
        return { };
    }


    if(firstUserStars > secondUserStars){

        const user1Data = await battleRepository.findUserByName(firstUser);
        if(!user1Data){
            battleRepository.insertUser(firstUser);
        }

        const user2Data = await battleRepository.findUserByName(secondUser);
        if(!user2Data){
            battleRepository.insertUser(secondUser);
        }

        const { id: user1Id, wins: user1Wins } = user1Data;
        const { id: user2Id, loses: user2Loses } = user2Data;

        battleRepository.updateWins(user1Id, user1Wins+1);
        battleRepository.updateLoses(user2Id, user2Loses+1);

        return {
            "winner": firstUser, 
            "loser": secondUser,
            "draw": false
        }
    }

    if(secondUserStars > firstUserStars){

        const user1Data = await battleRepository.findUserByName(firstUser);
        if(user1Data.rowCount === 0){
            battleRepository.insertUser(firstUser);
        }

        const user2Data = await battleRepository.findUserByName(secondUser);
        if(user2Data.rowCount === 0){
            battleRepository.insertUser(secondUser);
        }

        const { id: user1Id, loses: user1Loses } = user1Data;
        const { id: user2Id, wins: user2Wins } = user2Data;

        battleRepository.updateWins(user2Id, user2Wins+1);
        battleRepository.updateLoses(user1Id, user1Loses+1);
        
    
        return {
            "winner": secondUser, 
            "loser": firstUser,
            "draw": false
        }
    }


    if(secondUserStars === firstUserStars){

        const user1Data = await battleRepository.findUserByName(firstUser);
        if(user1Data.rowCount === 0){
            battleRepository.insertUser(firstUser);
        }

        const user2Data = await battleRepository.findUserByName(secondUser);
        if(user2Data.rowCount === 0){
            battleRepository.insertUser(secondUser);
        }

        const { id: user1Id, draws: user1Draws } = user1Data;
        const { id: user2Id, draws: user2Draws } = user2Data;

        battleRepository.updateWins(user2Id, user2Draws+1);
        battleRepository.updateLoses(user1Id, user2Draws+1);


        return {
            "winner": null, 
            "loser": null,
            "draw": true
        }

    }

}