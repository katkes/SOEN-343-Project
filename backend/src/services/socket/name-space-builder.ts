import { Server } from 'socket.io';
import { ConnectionEvent, SocketContext, SocketEvent, SocketMiddleware } from '../../types/socket';

export class NameSpaceBuilder {
  #io!: Server;
  #namespace!: string;
  #middleware: SocketMiddleware[] = [];
  #onConnectEvents: ConnectionEvent[] = [];
  #onDisconnectEvents: ConnectionEvent[] = [];
  #socketEvents: { event: string; callback: (socket: SocketContext) => SocketEvent }[] = [];

  setIo(io: Server) {
    this.#io = io;
    return this;
  }

  setNameSpace(namespace: string) {
    this.#namespace = namespace;
    return this;
  }

  addMiddleware(middleware: SocketMiddleware) {
    this.#middleware.push(middleware);
    return this;
  }
  addSocketEvent(event: string, callback: (socket: SocketContext) => SocketEvent) {
    this.#socketEvents.push({ event, callback });
    return this;
  }

  addOnConnectEvent(callback: (socket: SocketContext) => void) {
    this.#onConnectEvents.push(callback);
    return this;
  }
  addOnDisconnectEvent(callback: (socket: SocketContext) => void) {
    this.#onDisconnectEvents.push(callback);
    return this;
  }

  build() {
    // create namespace
    const nameSpaceInstance = this.#io.of(this.#namespace);

    // add middle ware if any
    this.#middleware.forEach((middleware) => nameSpaceInstance.use(middleware));

    // add on connect events
    nameSpaceInstance.on('connection', (socket) => {
      const socketContext = { socket, nameSpace: nameSpaceInstance };
      console.log(`New user connected to namespace ${this.#namespace}`);

      this.#onConnectEvents.forEach((callback) => callback(socketContext));

      this.#socketEvents.forEach(({ event, callback }) => {
        socket.on(event, callback(socketContext));
      });
      socket.on('disconnect', () => {
        console.log(`User disconnected from namespace ${this.#namespace}`);
        this.#onDisconnectEvents.forEach((callback) => callback(socketContext));
      });
    });

    return nameSpaceInstance;
  }
}
