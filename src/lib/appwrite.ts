import { Client, Account, Databases, Storage, Functions } from 'appwrite';

export const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('rs3-guessr');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
