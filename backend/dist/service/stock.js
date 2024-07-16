"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCrypto = fetchCrypto;
exports.removeData = removeData;
exports.getLatestData = getLatestData;
const Price_1 = __importDefault(require("../models/Price"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("../server");
dotenv_1.default.config();
let activeCrypto = 'solana';
let apiKeys = [];
let i = 1;
while (process.env[`API_KEY_${i}`]) {
    apiKeys.push(process.env[`API_KEY_${i}`]);
    i++;
}
async function fetchCrypto() {
    try {
        const api_key = apiKeys[Math.floor(Math.random() * apiKeys.length)];
        console.log("aa --", apiKeys);
        const response = await axios_1.default.post('https://api.livecoinwatch.com/coins/list', {
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
        });
        const stocksData = response.data;
        let newData = await Price_1.default.insertMany(stocksData.map((stock) => ({
            symbol: stock.name.toLowerCase(),
            price: stock.rate
        })));
        server_1.io.emit('UPDATE_DATA', { type: 'UPDATE_DATA', data: newData });
        console.log("Data is stored sucessfully in db");
    }
    catch (error) {
        console.log(error.message);
    }
}
;
async function removeData() {
    try {
        const now = new Date();
        const deleteBefore = new Date(now.getTime() - (3 * 60000));
        await Price_1.default.deleteMany({ createdAt: { $lt: deleteBefore } });
        console.log("all data has been deleted");
    }
    catch (error) {
        console.error("error in deleting the data", error);
    }
}
async function getLatestData(req, res) {
    try {
        const { symbol } = req.params;
        activeCrypto = symbol;
        const data = await Price_1.default.find({ symbol }).sort({ timestamp: -1 }).limit(21); //21 is for animating the last element
        res.status(200).json(data);
    }
    catch (error) {
        console.error("unable to fetch the data : error ", error);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zZXJ2aWNlL3N0b2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBaUJBLGtDQThCQztBQUdELGdDQVNDO0FBRUQsc0NBU0M7QUF0RUQsNERBQW9DO0FBQ3BDLGtEQUF5QjtBQUN6QixvREFBMkI7QUFDM0Isc0NBQStCO0FBRS9CLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFBO0FBQzNCLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFVixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQVcsQ0FBQyxDQUFDO0lBQ3BELENBQUMsRUFBRSxDQUFDO0FBQ04sQ0FBQztBQUdNLEtBQUssVUFBVSxXQUFXO0lBQzdCLElBQUksQ0FBQztRQUNHLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNwRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM5QixNQUFNLFFBQVEsR0FBRyxNQUFNLGVBQUssQ0FBQyxJQUFJLENBQUMsMENBQTBDLEVBQUU7WUFDMUUsUUFBUSxFQUFFLEtBQUs7WUFDZixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxXQUFXO1lBQ2xCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsS0FBSyxFQUFFLENBQUM7WUFDUixJQUFJLEVBQUUsSUFBSTtTQUNiLEVBQUU7WUFDQyxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLEdBQUcsT0FBTyxFQUFFO2FBQzVCO1NBQ0osQ0FBQyxDQUFBO1FBQ0YsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUdqQyxJQUFJLE9BQU8sR0FBRyxNQUFNLGVBQUssQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNqRSxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJO1NBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFHSixXQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDOUIsQ0FBQztBQUNMLENBQUM7QUFBQSxDQUFDO0FBR0ssS0FBSyxVQUFVLFVBQVU7SUFDNUIsSUFBSSxDQUFDO1FBQ0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2QixNQUFNLFlBQVksR0FBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUMzRCxNQUFNLGVBQUssQ0FBQyxVQUFVLENBQUMsRUFBQyxTQUFTLEVBQUcsRUFBQyxHQUFHLEVBQUcsWUFBWSxFQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkQsQ0FBQztBQUNMLENBQUM7QUFFTSxLQUFLLFVBQVUsYUFBYSxDQUFDLEdBQVMsRUFBRSxHQUFRO0lBQ25ELElBQUksQ0FBQztRQUNELE1BQU0sRUFBQyxNQUFNLEVBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQzVCLFlBQVksR0FBRyxNQUFNLENBQUM7UUFDdEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxlQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxTQUFTLEVBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLHNDQUFzQztRQUNsSCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQztBQUNMLENBQUMifQ==