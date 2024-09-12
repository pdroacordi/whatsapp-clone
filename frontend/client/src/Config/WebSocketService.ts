import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Message } from '../Models/Message';
import { BASE_API_URL } from './api';
import { Chat } from '../Models/Chat';

class WebSocketService {
  public stompClient: Client | null = null;
  private serverUrl = `${BASE_API_URL}/ws`;
  private reconnectDelay = 5000;
  private token = localStorage.getItem('token') || '';


  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const socket = new SockJS(`${this.serverUrl}?Authorization=${this.token}`);
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: this.reconnectDelay,
      onConnect: () => {
        console.log('Connected to WebSocket server');
      },
      onStompError: (frame : any) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
      debug: (str : any) => {
        console.log(str);
      }
    });
    this.stompClient.activate();
  }


  sendMessage(message: Message) {
    this.stompClient?.publish({
      destination: '/app/message',
      body: JSON.stringify(message),
    });
  }

  sendChatCreationEvent(chat : Chat){
    this.stompClient?.publish({
        destination: '/app/chats',
        body: JSON.stringify(chat)
    });
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}

export const webSocketService = new WebSocketService();
