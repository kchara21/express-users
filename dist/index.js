"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const indexRoute_1 = __importDefault(require("./routes/indexRoute"));
const helmet_1 = __importDefault(require("helmet"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use((0, cors_1.default)({ credentials: true }));
        this.app.use((0, helmet_1.default)({
            contentSecurityPolicy: false,
        }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use("/", indexRoute_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server on port`, this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
//# sourceMappingURL=index.js.map