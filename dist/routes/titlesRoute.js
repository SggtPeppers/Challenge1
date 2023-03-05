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
Object.defineProperty(exports, "__esModule", { value: true });
exports.titlesRoute = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
exports.titlesRoute = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
exports.titlesRoute.get('/:text', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const text = req.params.text;
    const title = yield prisma.post.findMany({
        where: {
            title: {
                contains: text,
            }
        },
        select: {
            title: true,
        }
    });
    if (title.length === 0) {
        return res.status(404).json({
            message: `Post with title ${text} not found`,
        });
    }
    const plainArrayOfPosts = Object.fromEntries(Object.entries(title));
    res.json(plainArrayOfPosts);
}));
