"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../../services/authService"); // Assuming an AuthService exists for handling authentication
class AuthController {
    constructor() {
        this.authService = new authService_1.AuthService();
    }
    async register(req, res) {
        try {
            const userData = req.body;
            const newUser = await this.authService.register(userData);
            res.status(201).json(newUser);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await this.authService.login(email, password);
            res.status(200).json({ token });
        }
        catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
    async logout(req, res) {
        try {
            await this.authService.logout(req.user); // Assuming req.user is set after authentication
            res.status(200).json({ message: 'Logged out successfully' });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.AuthController = AuthController;
