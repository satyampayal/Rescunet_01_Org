import app from "./app.js";
import connectedToDb from "./Config/dbConnection.js";
import { config } from 'dotenv';

const PORT=3000;

connectedToDb();
config()

app.listen(PORT,(e)=>{
    if(e){
        console.log("Not Coonected"+e)
    }else console.log("Server is Run on "+PORT)
})