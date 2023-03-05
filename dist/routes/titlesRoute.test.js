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
const titlesRoute_1 = require("./titlesRoute");
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
describe('titlesRoute', () => {
    let server;
    beforeAll(() => {
        const app = (0, express_1.default)();
        app.use('/', titlesRoute_1.titlesRoute);
        server = app.listen();
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    }));
    it('should respond with an object of post for a valid title', () => __awaiter(void 0, void 0, void 0, function* () {
        const text = 'beatae';
        const response = yield (0, supertest_1.default)(server).get(`/${text}`);
        expect(response.status).toBe(200);
        expect(response.body[1]).toEqual(expect.objectContaining({
            title: 'beatae enim quia vel',
        }));
    }));
    it('should respond with a 404 error for an invalid ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const text = 'text_not_found'; // Assume this text does not exist in a title on the the database
        const response = yield (0, supertest_1.default)(server).get(`/${text}`);
        expect(response.status).toBe(404);
    }));
});
