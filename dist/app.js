"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const event_route_1 = __importDefault(require("./routes/event.route"));
const booking_route_1 = __importDefault(require("./routes/booking.route"));
const review_route_1 = __importDefault(require("./routes/review.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/users", user_route_1.default);
app.use("/api/auth", auth_route_1.default);
app.use("/api/categories", category_route_1.default);
app.use("/api/events", event_route_1.default);
app.use("/api/bookings", booking_route_1.default);
app.use("/api/reviews", review_route_1.default);
app.get("/", async (req, res) => {
    res.status(200).json({
        "success": true,
        "message": "Hello World"
    });
});
exports.default = app;
