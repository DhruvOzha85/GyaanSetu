/**
 * Mock Socket.io service structure.
 * Replace with actual 'socket.io-client' when backend is ready.
 */

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(userId) {
    // this.socket = io(import.meta.env.VITE_WS_URL, { query: { userId } });
    console.log(`[Socket] Connecting user: ${userId}`);
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService();
