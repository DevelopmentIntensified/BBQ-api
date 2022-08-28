const User = require('./user');

class manager {
  constructor() {
    this.onlineUsers = new Map();
  }

  newUser(userData, id, uid) {
    this.onlineUsers.set(id, new User(userData, id, uid));
  }

  userLeft(id) {
    this.onlineUsers.delete(id);
  }

  userChallenge(id1, id2) {
    this.onlineUsers[id1].beginChallenge(id2);
    this.onlineUsers[id2].beginChallenge(id1);
  }

  getUser(id) {
    return this.onlineUsers[id];
  }

  getOnlineUsers() {
    const usernames = [];
    const users = [];
    if (this.onlineUsers === {}) return [];
    for (const i in this.onlineUsers) {
      if (this.onlineUsers[i] === undefined) continue;
      const { username } = this.onlineUsers[i];
      if (!users.includes(username)) users.push(this.onlineUsers[i]);
    }
    return users;
  }
}

module.exports = new manager();
