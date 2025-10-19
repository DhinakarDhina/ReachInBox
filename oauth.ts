import { OAuth2Client } from 'google-auth-library';
import User from '../../models/user';
import getOAuth2Client from '../../config/env';

const oauth2Client = new OAuth2Client(
  getOAuth2Client.OAUTH_CLIENT_ID,
  getOAuth2Client.OAUTH_CLIENT_SECRET
);

export const generateAuthUrl = () => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.readonly'],
  });
  return authUrl;
};

export const getToken = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};

export const refreshAccessToken = async (userId: string) => {
  const user = await User.findById(userId);
  const refreshToken = (user as any)?.refreshToken;
  if (!user || !refreshToken) {
    throw new Error('User not found or refresh token not available');
  }

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  const { credentials } = await oauth2Client.refreshAccessToken();
  return credentials;
};