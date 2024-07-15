"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDataBase = connectDataBase;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_URI = process.env.DB_URI;
if (!DB_URI) {
    throw new Error("DB URI is not present");
}
async function connectDataBase() {
    try {
        await mongoose_1.default.connect(DB_URI);
        console.log("connected to database");
    }
    catch (error) {
        console.log('Error connectig to database:', error);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb25maWcvZGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFVQSwwQ0FPQztBQWpCRCx3REFBZ0M7QUFDaEMsb0RBQTRCO0FBRTVCLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsTUFBTSxXQUFXLEdBQVEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7QUFDakQsSUFBRyxDQUFDLFdBQVcsRUFBQyxDQUFDO0lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFFTSxLQUFLLFVBQVUsZUFBZTtJQUNqQyxJQUFJLENBQUM7UUFDRCxNQUFNLGtCQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkQsQ0FBQztBQUNMLENBQUMifQ==