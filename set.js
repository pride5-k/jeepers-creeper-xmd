const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUF4SWZrNmgvb3lEcWoxOU5xRnFmSlhTTEp0MjErdVBUZUFGOFQrTDNHUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVm1RRVJzdzFMeFhIcVlvWDFFMGcrNzlCeUFUN1pmVTl4eEtPdzZiQVR4Zz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBT3NmZ2tXc0J5cGsrNHN3Q0V2VDlyZ0M4ckd3L29zSzkrczZkZGxZWGtvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzLzNaVG1EMHQvQmk1UTJYeGpYbEM1c2Q3YjVUSzhlOUczTlVMSDlSY1EwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlIVFVJWWpaK1k1QzNhSUZBZmExajZPVzU0aGh4RGFDa0lzVVVQdkU1bFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRSc3FIaTFIS0x3MVc1Zy9lNjBBaVV5ZnJtU0IvZnFKZlBrL3pSR2Z4MXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU09LVGJ6TDlhYUFqZFAxelIxTGlQdk9qaXVzWnE2VFBiQUdaQ1J1UmIxTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWjRvbVM2NkdWNW1Qd0UzS05zQkY5Zzl6cUZCdzY2NEY5aEh6a0hUdW5SQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpwUnBjUVl2RjlLTXZ3SUFFS2VySlU1V1hzQzBQRk9QWGphRERpQy9BL0l1ZGJtZWVDYWRFMFBZMEg2YnJ6dTNNaXBiTHJzQ2pjYlEramY2UG1QMGhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU0LCJhZHZTZWNyZXRLZXkiOiJDS0gwblBLS0g0aDVwbnA3Y3puOTlCV1BqRUNESW1NWVVUaXc4YnFzTGhZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc3MTA1MDY0NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzMkZEM0IwQjkzQTZGRTgxQUI0NkZBOUFFRDA1QUI4OCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU3MDkwODE1fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3NzEwNTA2NDVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNzc0MjZDRENBQjQ4MkQ4QzVCMUM3M0M1MDJERUE5RjUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NzA5MDgxNX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiVzhLRkJMMkMiLCJtZSI6eyJpZCI6IjI2Mzc3MTA1MDY0NTozNUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjQ0MTMxMzkyOTU0NTI3OjM1QGxpZCIsIm5hbWUiOiJQSyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUGp2bStzQ0VOZW43TVVHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRDlxekVocmx0UHRSTm1PZHpsSHNId2JnaXI0a2dKUnBoc28ycHFjaUt6cz0iLCJhY2NvdW50U2lnbmF0dXJlIjoidnNQaFE4TzNVU21Zb3hwdGJIMXdoZi9GZmZBaFhEbFRGOEJFOWlTQW9CU2Q5V3ZWRXM2OTNFdWQ5NU1KSi9TNkpBVzczQ3lTNE1yUHVrZnJlM3NJQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6IjBrVzZrbEhrMmNPRVl1alA1NzVsaG5ZVGs1ZytGUWpxbVdzbnpZNkI0SW56Vm1MeFFWSUZ1ckZBWm82R0I3YmcwR0hWTFE5MG8xc0c3YThDeDhqWGdBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzcxMDUwNjQ1OjM1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlEvYXN4SWE1YlQ3VVRaam5jNVI3QjhHNElxK0pJQ1VhWWJLTnFhbklpczcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1NzA5MDc4OSwibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKZVcifQ==',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/toxiclover-tech/TOXIC-LOVER-MD',
    OWNER_NAME : process.env.OWNER_NAME || "toxic lover",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254717263689",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/39n0nf.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "yes",              
    AUTO_READ: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'your status have been viewed by JEEPERS CREEPER-XMD',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    CHANNEL :process.env.CHANNEL || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    CAPTION : process.env.CAPTION || "✧JEEPERS CREEPER-XMD✧",
    BOT : process.env.BOT_NAME || '✧JEEPERS CREEPER-XMD TECH✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
