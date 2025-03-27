import { authService } from '../services/backend/auth';
import { Account, CompanyAccount, CompanyResponse, UserAccount, UserResponse } from '../types/account';
import { StoreKeys } from './keys';

export class AccountStore {
  static #accountStoreInstance?: AccountStore;
  static #fetchPromise?: Promise<CompanyResponse | UserResponse>;
  
  #account: Account | undefined;
  
  get account() {
    return this.#account;
  }

  private constructor(account: Account) {
    this.#account = account;
  }

  static async getInstance() {
    if (this.#accountStoreInstance) {
      return this.#accountStoreInstance;
    }
    const strAccountInfo = localStorage.getItem(StoreKeys.AccountInfo);
    let accountInfoObj: CompanyResponse | UserResponse;
    if (strAccountInfo) {
      accountInfoObj = JSON.parse(strAccountInfo) as CompanyResponse | UserResponse;
    } else if (this.#fetchPromise === undefined) {
      accountInfoObj = await authService.accountInfo();
      localStorage.setItem(StoreKeys.AccountInfo, JSON.stringify(accountInfoObj));
    } else {
      accountInfoObj = await this.#fetchPromise;
    }

    let accountInfo;

    if ('firstName' in accountInfoObj) {
      accountInfo = new UserAccount(accountInfoObj);
    } else {
      accountInfo = new CompanyAccount(accountInfoObj);
    }

    this.#accountStoreInstance = new AccountStore(accountInfo);
    return this.#accountStoreInstance;
  }

  static deleteInstance() {
    if (this.#accountStoreInstance) {
      this.#accountStoreInstance.#account = undefined;
      this.#fetchPromise = undefined;
    }

    localStorage.removeItem(StoreKeys.AccountInfo);
  }
}
