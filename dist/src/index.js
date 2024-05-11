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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const apiResponse_1 = __importDefault(require("../models/apiResponse"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const prisma = new client_1.PrismaClient();
app.use(body_parser_1.default.json());
app.get("/api/content/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let content = yield prisma.content.findUnique({ where: { contentId: req.params.id } });
        if (content) {
            res.status(200).json(new apiResponse_1.default(content));
        }
        else {
            res.status(404).json(new apiResponse_1.default("Not Found"));
        }
    }
    catch (error) {
        res.status(500).json(new apiResponse_1.default(error));
    }
}));
app.post("/api/content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.content.create({ data: req.body });
        res.status(201).json(new apiResponse_1.default(req.body));
    }
    catch (error) {
        res.status(500).json(new apiResponse_1.default(error));
    }
}));
app.put("/api/content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let content;
    try {
        content = yield prisma.content.findUnique({ where: { contentId: req.body.contentId } });
    }
    catch (error) {
        res.status(500).json(new apiResponse_1.default(error));
    }
    if (content == null) {
        res.sendStatus(400).json(new apiResponse_1.default("Not Valid Content Id"));
    }
    try {
        let savedContent = yield prisma.content.update({
            where: {
                contentId: req.body.contentId
            },
            data: {
                content: req.body.content
            }
        });
        res.status(200).json(new apiResponse_1.default(savedContent));
    }
    catch (error) {
        res.status(500).json(new apiResponse_1.default(error));
    }
}));
app.delete("/api/content/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.content.delete({ where: { contentId: req.params.id } });
        res.status(200).json(new apiResponse_1.default("Successfully Deleted"));
    }
    catch (error) {
        res.status(500).json(new apiResponse_1.default(error));
    }
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
