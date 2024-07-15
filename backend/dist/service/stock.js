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
const __1 = require("..");
dotenv_1.default.config();
let activeCrypto = 'solana';
let apiKeys = [];
let i = 1;
while (process.env[`API_KEY${i}`]) {
    apiKeys.push(process.env[`API_KEY${i}`]);
    i++;
}
async function fetchCrypto() {
    try {
        const api_key = apiKeys[Math.floor(Math.random() * apiKeys.length)];
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
        __1.io.emit('UPDATE_DATA', { type: 'UPDATE_DATA', data: newData });
        console.log("Data is stored sucessfully in db");
    }
    catch (error) {
        console.log(error);
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
        const data = await Price_1.default.find({ symbol }).sort({ timestamp: -1 }).limit(21);
        res.status(200).json(data);
    }
    catch (error) {
        console.error("unable to fetch the data : error ", error);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zZXJ2aWNlL3N0b2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBaUJBLGtDQTZCQztBQUdELGdDQVNDO0FBRUQsc0NBU0M7QUFyRUQsNERBQW9DO0FBQ3BDLGtEQUF5QjtBQUN6QixvREFBMkI7QUFDM0IsMEJBQXdCO0FBRXhCLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFBO0FBQzNCLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFVixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDbEMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQVcsQ0FBQyxDQUFDO0lBQ25ELENBQUMsRUFBRSxDQUFDO0FBQ04sQ0FBQztBQUdNLEtBQUssVUFBVSxXQUFXO0lBQzdCLElBQUksQ0FBQztRQUNHLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNwRSxNQUFNLFFBQVEsR0FBRyxNQUFNLGVBQUssQ0FBQyxJQUFJLENBQUMsMENBQTBDLEVBQUU7WUFDMUUsUUFBUSxFQUFFLEtBQUs7WUFDZixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxXQUFXO1lBQ2xCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsS0FBSyxFQUFFLENBQUM7WUFDUixJQUFJLEVBQUUsSUFBSTtTQUNiLEVBQUU7WUFDQyxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLEdBQUcsT0FBTyxFQUFFO2FBQzVCO1NBQ0osQ0FBQyxDQUFBO1FBQ0YsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUdqQyxJQUFJLE9BQU8sR0FBRyxNQUFNLGVBQUssQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNqRSxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJO1NBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFHSixNQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN0QixDQUFDO0FBQ0wsQ0FBQztBQUFBLENBQUM7QUFHSyxLQUFLLFVBQVUsVUFBVTtJQUM1QixJQUFJLENBQUM7UUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sWUFBWSxHQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFBO1FBQzNELE1BQU0sZUFBSyxDQUFDLFVBQVUsQ0FBQyxFQUFDLFNBQVMsRUFBRyxFQUFDLEdBQUcsRUFBRyxZQUFZLEVBQUMsRUFBQyxDQUFDLENBQUM7UUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO0lBQzVDLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDO0FBQ0wsQ0FBQztBQUVNLEtBQUssVUFBVSxhQUFhLENBQUMsR0FBUyxFQUFFLEdBQVE7SUFDbkQsSUFBSSxDQUFDO1FBQ0QsTUFBTSxFQUFDLE1BQU0sRUFBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDNUIsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUN0QixNQUFNLElBQUksR0FBRyxNQUFNLGVBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLFNBQVMsRUFBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDO0FBQ0wsQ0FBQyJ9