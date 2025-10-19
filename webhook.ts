import { Request, Response } from 'express';

export const triggerWebhook = async (req: Request, res: Response) => {
    const { url, payload } = req.body;

    if (!url || !payload) {
        return res.status(400).json({ error: 'URL and payload are required' });
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Webhook request failed with status: ${response.status}`);
        }

        return res.status(200).json({ message: 'Webhook triggered successfully' });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({ error: message });
    }
};