import { Server, Socket } from 'socket.io';
import { ConnectEvent, SocketContext, SocketEvent, SocketMiddleware } from '../../types/socket';

export class NameSpaceBuilder {
  #io!: Server;
  #namespace!: string;
  #middleware: SocketMiddleware[] = [];
  #onConnectEvents: ConnectEvent[] = [];
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

  addOnConnectEvent(callback: (socket: Socket) => void) {
    this.#onConnectEvents.push(callback);
    return this;
  }

  build() {
    // create namespace
    const nameSpaceInstance = this.#io.of(this.#namespace);

    // add middle ware if any
    this.#middleware.forEach((middleware) => nameSpaceInstance.use(middleware));

    // add on connect events
    nameSpaceInstance.on('connection', (socket) => {
      console.log(`New user connected to namespace ${this.#namespace}`);

      this.#onConnectEvents.forEach((callback) => callback(socket));

      this.#socketEvents.forEach(({ event, callback }) => {
        socket.on(event, callback({ socket, nameSpace: nameSpaceInstance }));
      });
      socket.on('disconnect', () => {
        console.log(`User disconnected from namespace ${this.#namespace}`);
      });
    });

    return nameSpaceInstance;
  }
}
