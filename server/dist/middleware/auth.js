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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: "Failed to get token"
            });
            return;
        }
        const token = bearerToken.split(' ');
        if (!token || token[1] == undefined) {
            res.status(404).json({
                success: false,
                message: "Failed to get token"
            });
            return;
        }
        const authToken = token[1];
        const decoededToken = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET);
        if (!decoededToken || !decoededToken.id) {
            res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
            return;
        }
        req.id = decoededToken.id;
        next();
    }
    catch (error) {
        const err = error.message;
        res.status(500).json({
            success: false,
            message: err || "Something went wrong"
        });
        return;
    }
});
exports.auth = auth;
