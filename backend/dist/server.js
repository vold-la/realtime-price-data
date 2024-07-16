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
app.use("/", function (req, res, next) {
    return res.status(200).send({ "message": "Hello" });
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHNEQUE4QjtBQUM5QixvREFBMkI7QUFDM0IsMERBQTRCO0FBQzVCLGdEQUF3QjtBQUN4QixnREFBd0I7QUFDeEIsOERBQXFDO0FBRXJDLDJEQUEwQztBQUMxQyxnREFBd0I7QUFDeEIsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3RDLGdEQUFvRDtBQUNwRCwyQ0FBMEQ7QUFFMUQsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFFdEMsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFDdEIsTUFBTSxNQUFNLEdBQUcsY0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUE0Q25CLGdCQUFFO0FBekNYLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxjQUFJLEdBQUUsQ0FBQyxDQUFDO0FBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxjQUFJLEVBQUM7SUFDVCxNQUFNLEVBQUUsR0FBRztJQUNYLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7Q0FDM0IsQ0FBQyxDQUFDLENBQUM7QUFHSixHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMzQixHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQztBQUVsRCxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxlQUFZLENBQUMsQ0FBQTtBQUNwQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtJQUNoQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFHLE9BQU8sRUFBRSxDQUFDLENBQUE7QUFDeEQsQ0FBQyxDQUFDLENBQUE7QUFHRixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsTUFBTSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFBO0FBRW5FLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBQyxFQUFFO0lBQ3JCLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztBQUMzRSxDQUFDLENBQUMsQ0FBQTtBQUdGLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQzNCLE1BQU0sSUFBQSwwQkFBZSxHQUFFLENBQUM7SUFFeEIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFXLEVBQUUsRUFBRTtRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFFN0MsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUUzQyxtQkFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsbUJBQVcsQ0FBQyxDQUFDO0lBQzVDLG1CQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxrQkFBVSxDQUFDLENBQUM7QUFDN0MsQ0FBQyxDQUFDLENBQUEifQ==