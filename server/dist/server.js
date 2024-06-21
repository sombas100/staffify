"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors = require("cors");
const body_parser_1 = __importDefault(require("body-parser"));
const staff_1 = __importDefault(require("./routes/staff"));
const attendance_1 = __importDefault(require("./routes/attendance"));
const payments_1 = __importDefault(require("./routes/payments"));
const auth_1 = __importDefault(require("./routes/auth"));
const auth_2 = require("./controllers/auth");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(body_parser_1.default.json());
const uri = process.env.MONGODB_URI;
mongoose_1.default.connect('mongodb+srv://sparkyvids:VshiiFobWB0oDgQt@staffify.aysa3gi.mongodb.net/')
    .then(() => console.log('Staffify database is connected'))
    .catch((err) => {
    console.error('MongoDB connection error:', err);
});
app.use('/api/auth', auth_1.default);
app.use('/api/staff', staff_1.default);
app.use('/api/attendance', auth_2.authMiddleware, attendance_1.default);
app.use('/api/payments', auth_2.authMiddleware, payments_1.default);
app.listen(PORT, () => {
    console.log(`Server is now running on port: ${PORT}`);
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
