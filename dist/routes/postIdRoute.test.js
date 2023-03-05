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
const postIdRoute_1 = require("./postIdRoute");
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
describe('postIdRoute', () => {
    let server;
    beforeAll(() => {
        const app = (0, express_1.default)();
        app.use('/', postIdRoute_1.postIdRoute);
        server = app.listen();
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    }));
    it('should respond with a post object for a valid ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const postId = 1;
        const response = yield (0, supertest_1.default)(server).get(`/${postId}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: postId,
        }));
    }));
    it('should respond with a 404 error for an invalid ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const postId = 999; // Assume this ID does not exist in the database
        const response = yield (0, supertest_1.default)(server).get(`/${postId}`);
        expect(response.status).toBe(404);
    }));
});
