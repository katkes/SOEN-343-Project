import { io, Socket } from 'socket.io-client';

/**
 * Flyweight pattern managing a pool of socket connections, without recreating one if it already exists
 *
 */
export class SocketFlyweight {
  static sockets = new Map<string, Socket>();

  static getSocket(nameSpace: string) {
    console.log("hi there")
    let socket = this.sockets.get(nameSpace);
    if (socket) {
      return socket;
    }
    socket = io(nameSpace);
    this.sockets.set(nameSpace, socket);
    return socket;
  }
}