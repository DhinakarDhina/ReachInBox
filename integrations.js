"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const integrationController_1 = require("../controllers/integrationController");
const router = (0, express_1.Router)();
const integrationController = new integrationController_1.IntegrationController();
// Route for Slack integration
router.post('/slack', integrationController.handleSlackIntegration);
// Route for webhook integration
router.post('/webhook', integrationController.handleWebhookIntegration);
exports.default = router;
