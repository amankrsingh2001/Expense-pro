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
exports.pdfList = exports.removeExpense = exports.removeIncome = exports.getExpensebyId = exports.getIncomebyId = exports.getAllIncome = exports.getAllExpense = exports.addExpense = exports.addIncome = void 0;
const prisma_1 = require("../lib/prisma");
const pdfkit_1 = __importDefault(require("pdfkit"));
const addIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const id = req.id;
        if (!data || !id) {
            res.status(404).json({
                success: false,
                message: "Data not found"
            });
            return;
        }
        const addIncome = yield prisma_1.prisma.income.create({
            data: {
                userId: id,
                amount: parseInt(data.amount),
                category: data.category,
                title: data.title,
                description: data.description,
                date: new Date(data.date)
            }
        });
        if (!addIncome || !addIncome.id) {
            res.status(402).json({
                message: "Failed to add Income",
                success: true
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Income added Successfully",
            income: addIncome
        });
        return;
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
exports.addIncome = addIncome;
const addExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const id = req.id;
        if (!data || !id) {
            res.status(404).json({
                success: false,
                message: "Data not found"
            });
            return;
        }
        const addUserExpense = yield prisma_1.prisma.expense.create({
            data: {
                userId: id,
                amount: parseInt(data.amount),
                category: data.category,
                title: data.title,
                description: data.description,
                date: new Date(data.date)
            }
        });
        if (!addUserExpense || !addUserExpense.id) {
            res.status(402).json({
                message: "Failed to add expense",
                success: true,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Income added Successfully",
            expense: addUserExpense
        });
        return;
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
exports.addExpense = addExpense;
const getAllExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.id;
        if (!userId) {
            res.status(404).json({
                success: false,
                message: "Data not found"
            });
            return;
        }
        const getUserAllExpense = yield prisma_1.prisma.expense.findMany({
            where: {
                userId: userId
            }
        });
        res.status(200).json({
            success: true,
            message: "Expense sent successfully",
            expenses: getUserAllExpense
        });
        return;
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
exports.getAllExpense = getAllExpense;
const getAllIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.id;
        if (!userId) {
            res.status(404).json({
                success: false,
                message: "Data not found"
            });
            return;
        }
        const getUserAllIncome = yield prisma_1.prisma.income.findMany({
            where: {
                userId: userId
            }
        });
        res.status(200).json({
            success: true,
            message: "Income sent successfully",
            income: getUserAllIncome
        });
        return;
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
exports.getAllIncome = getAllIncome;
const getIncomebyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params;
        const userId = req.id;
        const getSingleIncome = yield prisma_1.prisma.income.findFirst({
            where: {
                id: id
            }
        });
        if (!getSingleIncome || !getSingleIncome.id) {
            res.status(404).json({
                success: false,
                message: 'Income not found'
            });
            return;
        }
        if (userId !== getSingleIncome.userId) {
            res.status(401).json({
                message: "User id isnt valid",
                success: false
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Income sent successfully",
            incomeById: getSingleIncome
        });
        return;
    }
    catch (error) {
        const err = error.message;
        res.status(404).json({
            success: false,
            message: err || 'Something went wrong'
        });
        return;
    }
});
exports.getIncomebyId = getIncomebyId;
const getExpensebyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params;
        const userId = req.id;
        const getSingleExpense = yield prisma_1.prisma.expense.findFirst({
            where: {
                id: id
            }
        });
        if (!getSingleExpense || !getSingleExpense.id) {
            res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
            return;
        }
        if (userId !== getSingleExpense.userId) {
            res.status(401).json({
                message: "User id isnt valid",
                success: false
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Income sent successfully",
            expenseById: getSingleExpense
        });
        return;
    }
    catch (error) {
        const err = error.message;
        res.status(404).json({
            success: false,
            message: err || 'Something went wrong'
        });
        return;
    }
});
exports.getExpensebyId = getExpensebyId;
const removeIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || id == undefined) {
            throw new Error("Id not found");
        }
        const deleteIncome = yield prisma_1.prisma.income.delete({
            where: {
                id: id
            }
        });
        res.status(200).json({
            message: "Deleted successfully",
            suceess: true
        });
    }
    catch (error) {
        const err = error.message;
        res.status(500).json({
            success: false,
            message: err || "Something went wrong"
        });
    }
});
exports.removeIncome = removeIncome;
const removeExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || id == undefined) {
            throw new Error("Id not found");
        }
        const deleteExpense = yield prisma_1.prisma.expense.delete({
            where: {
                id: id
            }
        });
        res.status(200).json({
            message: "Deleted successfully",
            success: true
        });
    }
    catch (error) {
        const err = error.message;
        res.status(500).json({
            success: false,
            message: err || "Something went wrong"
        });
    }
});
exports.removeExpense = removeExpense;
const pdfList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Initialize PDF document
        const doc = new pdfkit_1.default({ size: 'A4', margin: 50 });
        // Set response headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        doc.pipe(res);
        doc.fontSize(20).text('Monthly Financial Report', { align: 'center' });
        doc.moveDown(1.5);
        doc.fontSize(16).text('Income Transactions', { underline: true });
        doc.moveDown(0.5);
        const batchSize = 5000;
        let skip = 0;
        while (true) {
            const incomes = yield prisma_1.prisma.income.findMany({
                skip,
                take: batchSize,
                orderBy: { date: 'asc' },
            });
            if (incomes.length === 0)
                break;
            incomes.forEach((income) => {
                const line = `${income.date.toISOString().split('T')[0]}| ${income.title} | ${income.description} | ₹${income.amount}`;
                doc.fontSize(12).text(line);
            });
            skip += batchSize;
        }
        doc.addPage();
        doc.fontSize(16).text('Expense Transactions', { underline: true });
        doc.moveDown(0.5);
        skip = 0;
        while (true) {
            const expenses = yield prisma_1.prisma.expense.findMany({
                skip,
                take: batchSize,
                orderBy: { date: 'asc' },
            });
            if (expenses.length === 0)
                break;
            expenses.forEach((expense) => {
                const line = `${expense.date.toISOString().split('T')[0]} | ${expense.title}  | ${expense.description} | ₹${expense.amount}`;
                doc.fontSize(12).text(line);
            });
            skip += batchSize;
        }
        // Finalize the PDF
        doc.end();
    }
    catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: 'Failed to generate PDF' });
    }
});
exports.pdfList = pdfList;
