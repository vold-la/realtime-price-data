import Price from '../models/Price';
import axios from 'axios'
import dotenv from "dotenv"
import { io } from '../server';

dotenv.config();

let activeCrypto = 'solana'
let apiKeys: string[] = [];
let i = 1;

while (process.env[`API_KEY_${i}`]) {
  apiKeys.push(process.env[`API_KEY_${i}`] as string);
  i++;
}


export async function fetchCrypto(){
    try {
            const api_key = apiKeys[Math.floor(Math.random() * apiKeys.length)];
            console.log("aa --", apiKeys);
            const response = await axios.post('https://api.livecoinwatch.com/coins/list', {
                currency: "USD",
                sort: "rank",
                order: "ascending",
                offset: 0,
                limit: 5,
                meta: true
            }, {
                headers: {
                    'x-api-key': `${api_key}`
                }
            })
            const stocksData = response.data;
            

            let newData = await Price.insertMany(stocksData.map((stock: any) => ({
                symbol: stock.name.toLowerCase(),
                price: stock.rate
            })))


            io.emit('UPDATE_DATA', { type: 'UPDATE_DATA', data: newData });
            console.log("Data is stored sucessfully in db");
    } catch (error) {
        console.log(error.message)
    }
};


export async function removeData(){
    try {
        const now = new Date();
        const deleteBefore  = new Date(now.getTime() - (3 * 60000))
        await Price.deleteMany({createdAt : {$lt : deleteBefore}});
        console.log("all data has been deleted")
    } catch (error) {
        console.error("error in deleting the data", error);
    }
}

export async function getLatestData(req : any, res: any){
    try {
        const {symbol} = req.params;
        activeCrypto = symbol;
        const data = await Price.find({ symbol }).sort({timestamp : -1}).limit(21); //21 is for animating the last element
        res.status(200).json(data);
    } catch (error) {
        console.error("unable to fetch the data : error ", error);
    }
}