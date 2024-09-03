import config from "../Conf/Config";
import { Client, Account, ID } from "appwrite";

export class AuthServies {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async CreateAccount({ email, password, name }) {
    try {
      const useraccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (useraccount) {
        return this.Login({ email, password });
      } else {
        return useraccount;
      }
    } catch (error) {
      console.error("Error creating account:", error);
      throw new Error("Failed to create an account");
    }
  }
  async Login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid email or password");
    }
  }

  async getCurrentUser() {
    try {
      return this.account.get();
    } catch (error) {
      console.error("get error:", error);
      throw new Error("Invalid get");
    }
  }
  async logout() {
    try {
      return this.account.deleteSessions();
    } catch (error) {
      console.error("delete error:", error);
      throw new Error("Invalid detete");
    }
  }
}

const authServies = new AuthServies();

export default authServies;
