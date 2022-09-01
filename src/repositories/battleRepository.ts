import connection from "../database/postgres";

async function findUserByName(username:string) {
    
    return (await connection.query(`select * from fighters where username = $1`, [username])).rows[0] ;
}

async function updateWins(id: number, wins: number) {
    
    await connection.query(`update fighters set "wins" = $1 where id = $2`, [wins, id]);
}


async function updateLoses(id: number, loses: number) {
    await connection.query(`update fighters set "wins" = $1 where id = $2`, [loses, id]);
}


async function updateDraws(id: number, draws: number) {
    await connection.query(`update fighters set "wins" = $1 where id = $2`, [draws, id]);
}


async function insertUser(user:string) {
    await connection.query(`insert into fighters(username, wins, losses, draws) values ($1, 0, 0, 0)`, [user]);
}

export const battleRepository = {
    findUserByName,
    insertUser,
    updateWins,
    updateDraws,
    updateLoses
}