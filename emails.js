"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailController_1 = require("../controllers/emailController");
const router = (0, express_1.Router)();
const emailController = new emailController_1.EmailController();
// Route to fetch all emails
router.get('/', emailController.fetchAllEmails);
// Route to categorize an email
router.post('/categorize', emailController.categorizeEmail);
// Route to send an email
router.post('/send', emailController.sendEmail);
// Route to search emails
router.get('/search', emailController.searchEmails);
exports.default = router;
