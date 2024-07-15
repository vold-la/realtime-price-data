"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const stock_1 = __importDefault(require("./router/stock"));
const cors_1 = __importDefault(require("cors"));
const socketIo = require('socket.io');
const database_1 = require("./config/database");
const stock_2 = require("./service/stock");
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = socketIo(server);
exports.io = io;
app.use((0, cors_1.default)());
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST']
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use("/api/crypto", stock_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/build")));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/build", "index.html"));
});
server.listen(PORT, async () => {
    await (0, database_1.connectDataBase)();
    io.on('connection', (socket) => {
        console.log('Client is connected to socket');
        socket.on('disconnect', () => {
            console.log('Client got disconnected from socket');
        });
    });
    console.log(`Server is running at ${PORT}`);
    node_cron_1.default.schedule('*/3 * * * * *', stock_2.fetchCrypto);
    node_cron_1.default.schedule('*/3 * * * *', stock_2.removeData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsb0RBQTJCO0FBQzNCLDBEQUE0QjtBQUM1QixnREFBd0I7QUFDeEIsZ0RBQXdCO0FBQ3hCLDhEQUFxQztBQUVyQywyREFBMEM7QUFDMUMsZ0RBQXdCO0FBQ3hCLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN0QyxnREFBb0Q7QUFDcEQsMkNBQTBEO0FBRTFELGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBRXRDLE1BQU0sR0FBRyxHQUFHLElBQUEsaUJBQU8sR0FBRSxDQUFDO0FBQ3RCLE1BQU0sTUFBTSxHQUFHLGNBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBeUNuQixnQkFBRTtBQXRDWCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsY0FBSSxHQUFFLENBQUMsQ0FBQztBQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsY0FBSSxFQUFDO0lBQ1QsTUFBTSxFQUFFLEdBQUc7SUFDWCxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO0NBQzNCLENBQUMsQ0FBQyxDQUFDO0FBR0osR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFFbEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsZUFBWSxDQUFDLENBQUE7QUFHcEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUVuRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUMsRUFBRTtJQUNyQixHQUFHLENBQUMsUUFBUSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLG9CQUFvQixFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFDM0UsQ0FBQyxDQUFDLENBQUE7QUFHRixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLElBQUksRUFBRTtJQUMzQixNQUFNLElBQUEsMEJBQWUsR0FBRSxDQUFDO0lBRXhCLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsTUFBVyxFQUFFLEVBQUU7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBRTdDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLElBQUksRUFBRSxDQUFDLENBQUE7SUFFM0MsbUJBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLG1CQUFXLENBQUMsQ0FBQztJQUM1QyxtQkFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsa0JBQVUsQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQyxDQUFBIn0=