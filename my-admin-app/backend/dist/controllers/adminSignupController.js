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
const bcrypt_1 = __importDefault(require("bcrypt"));
const AdminUser_1 = __importDefault(require("../models/AdminUser")); // Import the model
// Admin Signup Controller
const adminSignupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Check if username or password is missing
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    // Check if username already exists
    const existingUser = yield AdminUser_1.default.findOne({ username });
    if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
    }
    // Validate password complexity (you can add your own password complexity rules)
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    // Hash the password before saving
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    // Save the new admin user to the database
    const newAdminUser = new AdminUser_1.default({
        username,
        password: hashedPassword,
    });
    try {
        yield newAdminUser.save();
        return res.status(201).json({ message: 'Admin user created successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating admin user', error });
    }
});
exports.default = adminSignupController;
