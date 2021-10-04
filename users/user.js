class user {
  constructor(user,id){
    this.user = user
    this.rooms = new Map()
    this.challenge = null
    this.socketID = id
    this.loginTime = new Date()
    this.typequizzingIDs = new Map()
    this.friendsIds = new Map()
  }
  beginChallenge(opponent){}
  enterRoom(){}
}