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
exports.routes = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typebox_1 = require("@sinclair/typebox");
const client_1 = require("@prisma/client");
const postsPaginatedRoute_1 = require("./routes/postsPaginatedRoute");
const defaultRoute_1 = require("./routes/defaultRoute");
const postIdRoute_1 = require("./routes/postIdRoute");
const commentsRoute_1 = require("./routes/commentsRoute");
const titlesRoute_1 = require("./routes/titlesRoute");
const axios = require('axios').default;
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.routes = express_1.default.Router();
const port = process.env.PORT;
const postType = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    userId: typebox_1.Type.Number(),
    title: typebox_1.Type.String(),
    body: typebox_1.Type.String(),
});
const userType = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    email: typebox_1.Type.String(),
    name: typebox_1.Type.String(),
});
const commentType = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    postId: typebox_1.Type.Number(),
    name: typebox_1.Type.String(),
    email: typebox_1.Type.String(),
    body: typebox_1.Type.String(),
});
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.get('https://jsonplaceholder.typicode.com/users');
    const users = response.data;
    const data = [];
    users.map((user) => {
        data.push({
            id: user.id,
            email: user.email,
            name: user.name,
        });
    });
    yield prisma.user.createMany({
        data,
        skipDuplicates: true,
    });
});
const getPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data;
    const data = [];
    posts.map((post) => {
        data.push({
            id: post.id,
            userId: post.userId,
            title: post.title,
            body: post.body,
        });
    });
    yield prisma.post.createMany({
        data,
        skipDuplicates: true,
    });
});
const getComments = () => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield prisma.post.findMany();
    posts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
        const postId = post.id;
        const response = yield axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const comments = response.data;
        const data = [];
        comments.map((comment) => {
            data.push({
                id: comment.id,
                postId: comment.postId,
                name: comment.name,
                email: comment.email,
                body: comment.body,
            });
        });
        yield prisma.comment.createMany({
            data,
            skipDuplicates: true,
        });
    }));
});
exports.app.use('/', defaultRoute_1.defaultRoute);
exports.app.use('/posts', postsPaginatedRoute_1.postPaginatedRoute);
exports.app.use('/post', postIdRoute_1.postIdRoute);
exports.app.use('/comments', commentsRoute_1.commentsRoute);
exports.app.use('/title', titlesRoute_1.titlesRoute);
exports.app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// getUsers();
// getPosts();
// getComments();
