import { Namespace, Server } from 'socket.io';

export class NameSpaceFactory {
  static #nameSpaces: Map<string, Namespace> = new Map();

  static createNameSpace(
    io: Server,
    name: string,
    callback: (io: Server, namespace: string) => Namespace,
  ) {
    const nameSpace = callback(io, name);
    this.#nameSpaces.set(nameSpace.name, nameSpace);
    return nameSpace;
  }

  static getNameSpace(namespace: string) {
    return this.#nameSpaces.get(namespace);
  }
}
