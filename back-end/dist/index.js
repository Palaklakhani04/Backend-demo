"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./router/index"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = require("./middleware/auth");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(auth_1.authenticateUser);
const corsOptions = {
    origin: 'http://localhost:8000', // Allow requests only from this origin
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use('/api', index_1.default);
// cron.schedule(' * * * * *', async() => {
//     await sendMail()
//   console.log('Cron job running every minute at', new Date().toLocaleTimeString());
// });
app.listen(process.env.PORT, () => console.log("server is runing on loacalhost"));
