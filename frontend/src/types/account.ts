import { UserRole } from "./auth";

export abstract class Account {
  public readonly _id: string;
  public readonly email: string;
  public readonly companyName?: string;
  constructor(_id: string, email: string, companyName?: string) {
    this._id = _id;
    this.email = email;
    this.companyName = companyName;
  }
}

export class CompanyAccount extends Account {
  public readonly companyName: string;
  constructor({ _id, email, companyName }: CompanyResponse) {
    super(_id, email, companyName);
    this.companyName = companyName;
  }
}

export class UserAccount extends Account {
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly role: UserRole;
  constructor({ _id, firstName, lastName, email, role, companyName }: UserResponse) {
    super(_id, email, companyName);
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}

export interface UserResponse {
  _id: string
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  companyName?: string;
}

export interface CompanyResponse {
  _id: string
  email: string;
  companyName: string; // to be changed to object id
}