import Config from './config';
import { IAuthenticatedUser } from '../models'

export const tryLogin = async (): Promise<IAuthenticatedUser> => {
    return new Promise((resolve, reject) => {
        if (!Config.NeynarLoginUrl) return reject(new Error("Neynar Login URL has not been configured"));
        if (!Config.NeynarClientId) return reject(Error("Neynar Client ID has not been configured"));
        const neynarLoginUrl = Config.NeynarLoginUrl;
        const authUrl = new URL(neynarLoginUrl);
        authUrl.searchParams.append("client_id", Config.NeynarClientId);
        const authOrigin = new URL(neynarLoginUrl).origin;
        const authWindow = window.open(authUrl.toString(), "_blank");

        const handleMessage = (event: MessageEvent<any>) => {
            if (event.origin === authOrigin && event.data.is_authenticated) {
                resolve(event.data);

                if (authWindow) {
                    authWindow.close();
                }

                window.removeEventListener("message", handleMessage);
            }
        };

        window.addEventListener("message", handleMessage, false);
    });
}