"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminCodeVerificationController = (req, res) => {
    const { code } = req.body;
    const ADMIN_CODE = '123456';
    if (code === ADMIN_CODE) {
        res.status(200).json({ message: 'Admin code verified!' });
    }
    else {
        res.status(401).json({ message: 'Incorrect admin code.' });
    }
};
exports.default = adminCodeVerificationController;
