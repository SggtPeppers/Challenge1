"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postsPaginatedRoute_1 = require("./postsPaginatedRoute");
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
describe('postPaginatedRoute', () => {
    let server;
    beforeAll(() => {
        const app = (0, express_1.default)();
        app.use('/', postsPaginatedRoute_1.postPaginatedRoute);
        server = app.listen();
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    }));
    it('should respond with an array', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server).get(`/`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0].id).toBe(1);
    }));
});
