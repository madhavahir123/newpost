import config from "../Conf/Config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Servies {
  cilent = new Client();
  databases;
  bucket;
  constructor() {
    this.cilent
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.cilent);
    this.bucket = new Storage(this.cilent);
  }

  async CreatePost({ title, slug, content, featureimg, status, userid }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureimg,
          status,
          userid,
        }
      );
    } catch (error) {
      console.log("creat post ", error);
    }
  }

  async updatePost(slug, { title, content, featureimg, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureimg,
          status,
        }
      );
    } catch (error) {
      console.log("updatepost ", error);
    }
  }
  async deletepost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("deletepost", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("getPost", error);
    }
  }
  async getposts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("getpostss", error);
      return false;
    }
  }

  //file upload servies
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("fileupload", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("deletefile", error);
      return false;
    }
  }

  getfilePreview(fileId) {
    return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const servies = new Servies();
export default servies;
