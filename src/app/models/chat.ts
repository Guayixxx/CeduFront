import { Message } from "./message";

export class Chat {

    chatId!: Number;
    firstUserName!: String;
    secondUserName?: String;
    messageList?: Message[];

    constructor() {

    }
}
