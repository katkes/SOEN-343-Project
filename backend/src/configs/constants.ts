export const SERVER_ART = `
    __  __________________   _____ ____  ____________     _____   ________
   /  |/  / ____/ ____/   | / ___// __ \\/ ____/_  __/    /  _/ | / / ____/
  / /|_/ / __/ / / __/ /| | \\__ \\/ / / / /_    / /       / //  |/ / /     
 / /  / / /___/ /_/ / ___ |___/ / /_/ / __/   / /    _ _/ // /|  / /___   
/_/  /_/_____/\\____/_/  |_/____/\\____/_/     /_/    (_)___/_/ |_/\\____/   

 _____                 _    __       _   _       
| ____|_   _____ _ __ | |_ / _|_   _| | (_) ___  
|  _| \\ \\ / / _ \\ '_ \\| __| |_| | | | | | |/ _ \\ 
| |___ \\ V /  __/ | | | |_|  _| |_| | |_| | (_) |
|_____| \\_/ \\___|_| |_|\\__|_|  \\__,_|_(_)_|\\___/ 
                                                                          
`;

export const SESSION_TIMEOUT = '1h';

export const DefaultCookieConfig = {
  httpOnly: true,
  maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
  secure: true,
  sameSite: 'lax',
} as const;

export const JWT_COOKIE_NAME = 'jwt';

export const SocketNameSpaces = {
  CHATROOM: '/chatroom',
} as const;
