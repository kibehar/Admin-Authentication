"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminSignupController_1 = __importDefault(require("../controllers/adminSignupController"));
const adminLoginController_1 = __importDefault(require("../controllers/adminLoginController"));
const adminCodeVerificationController_1 = __importDefault(require("../controllers/adminCodeVerificationController"));
const router = express_1.default.Router();
// Admin Signup Route
router.post('/signup', adminSignupController_1.default);
// Admin Login Route
router.post('/login', adminLoginController_1.default);
// Admin Code Verification Route
router.post('/verify-code', adminCodeVerificationController_1.default);
exports.default = router;
