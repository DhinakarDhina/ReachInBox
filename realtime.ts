import { Server } from 'socket.io';
import ImapSync from '../email/imapSync';
import * as SlackIntegration from '../integrations/slack';

export class RealtimeEmailService {
    private io: Server;
    private emailService: any;
    private notificationService: any;

    constructor(server: any) {
        this.io = new Server(server);
        const ImapSyncClass: any = ImapSync;
        this.emailService = new ImapSyncClass();

        const NotificationServiceClass: any =
            (SlackIntegration as any).NotificationService ||
            (SlackIntegration as any).default ||
            (SlackIntegration as any);
        this.notificationService = new NotificationServiceClass();

        this.setupListeners();
    }

    private setupListeners() {
        this.io.on('connection', (socket) => {
            console.log('New client connected');

            socket.on('subscribeToEmailUpdates', (userId) => {
                socket.join(userId);
                console.log(`Client subscribed to email updates for user: ${userId}`);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });

        this.emailService.on('emailUpdated', (email: { userId: string | string[]; }) => {
            this.io.to(email.userId).emit('emailUpdated', email);
            this.notificationService.sendEmailUpdateNotification(email);
        });
    }
}