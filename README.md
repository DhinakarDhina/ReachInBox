# Backend Engineering Assignment

This project is a backend engineering assignment that implements a comprehensive email management system with various features including real-time email synchronization, searchable storage using Elasticsearch, AI-based email categorization, and integration with Slack and webhooks.

## Features

- **Real-time Email Synchronization**: Synchronizes emails in real-time using IMAP.
- **Searchable Storage**: Utilizes Elasticsearch for indexing and searching emails.
- **AI-based Email Categorization**: Categorizes emails using AI models for better organization.
- **Slack Integration**: Sends notifications and updates to Slack channels.
- **Webhook Integration**: Triggers webhooks for various events.
- **AI-powered Suggested Replies**: Generates suggested replies based on email content.
- **Frontend Interface**: A user-friendly interface for managing emails and interactions.

## Project Structure

- **src/**: Contains the main application code.
  - **api/**: Defines routes and controllers for handling requests.
  - **services/**: Implements business logic and integrations.
  - **models/**: Defines data models for emails and users.
  - **workers/**: Contains background workers for processing tasks.
  - **utils/**: Utility functions for logging and timers.
  - **config/**: Configuration files for environment variables and settings.
  
- **prisma/**: Contains the database schema for Prisma.
  
- **frontend/**: Contains the frontend application code.
  
- **scripts/**: Contains scripts for database migrations and starting the development server.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd backend-engineering-assignment
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

5. Start the development server:
   ```
   npm run start-dev
   ```

## Testing

To run tests, use the following command:
```
npm test
```

## License

This project is licensed under the MIT License.