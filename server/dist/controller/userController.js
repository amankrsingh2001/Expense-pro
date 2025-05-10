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
exports.verifyUser = exports.login = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data == null)
            return;
        const saltRound = 10;
        const password = bcrypt_1.default.hashSync(data.password, saltRound);
        const createUser = yield prisma_1.prisma.user.create({
            data: {
                email: data.email,
                password: password,
                name: data.name
            }
        });
        if (!createUser.id) {
            res.status(500).json({
                message: "Failed to create User",
                success: false
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "User created Successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            success: false
        });
        return;
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data == null) {
            res.status(404).json({
                success: false,
                message: "Data not found"
            });
            return;
        }
        const findUser = yield prisma_1.prisma.user.findFirst({
            where: {
                email: data.email
            }
        });
        if (findUser == null) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }
        const verifyPassword = bcrypt_1.default.compare(data.password, findUser === null || findUser === void 0 ? void 0 : findUser.password);
        if (!verifyPassword) {
            res.status(401).json({
                success: false,
                message: "Password isnt valid"
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: findUser.id }, process.env.JWT_SECRET, { expiresIn: '5h' });
        console.log(token);
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token: token
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
        return;
    }
});
exports.login = login;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            success: true,
            message: "Token is valid"
        });
        return;
    }
    catch (error) {
        const err = error.message;
        res.status(500).json({
            success: false,
            message: "Token Invalid"
        });
    }
});
exports.verifyUser = verifyUser;
