class user {
  constructor(user, id, uid) {
    this.user = user;
    this.username = user.userName;
    this.activeChats = new set();
    this.chatsLastViewedIds = new Map();
    this.socketID = id;
    this.uid = uid;
    this.loginTime = Date.now() + new Date().getTimezoneOffset() * 60 * 1000;
  }

  setLastViewedChats(data) {
    for (const i in data) {
      this.chatsLastViewedIds.set(i, data[i]);
    }
  }

  enterRoom(roomId) {
    this.activeChats.add(roomId);
  }
}

module.exports = user;
