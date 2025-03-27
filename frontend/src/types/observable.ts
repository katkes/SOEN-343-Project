// Observer pattern
export interface Observer {
  notify(observable: Observable): void;  
}

export abstract class Observable {
  readonly observers: Set<Observer> = new Set();
  nofityAll = ()=> this.observers.forEach((obs)=>obs.notify(this))
  register = (observer: Observer) => (this.observers.add(observer));
  unregister = (observer: Observer) => (this.observers.delete(observer))
}
