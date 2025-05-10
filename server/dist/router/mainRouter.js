"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const userRouter_1 = require("./userRouter");
const expenseRouter_1 = require("./expenseRouter");
exports.mainRouter = (0, express_1.Router)();
exports.mainRouter.use('/user', userRouter_1.userRouter);
exports.mainRouter.use('/expense', expenseRouter_1.expenseRouter);
