
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

module.exports = (db, tokenSecret) => {
  const users = db.sublevel('users');
  const authService = {};

  authService.login = (username,password,callback) => {
    users.get(username, (err, user)=>{
      if(err)return callback(err);

      bcrypt.compare(password, user.hash, (err, res) =>{
        if(err) return callback(err);
        if(!res) return callback(new Error('Invalid password'));

        const token = jwt.encode({
          username: username,
          expire: Date.now() + (1000 * 60 * 60)
        }, tokenSecret);

        callback(null, token);
      })
    })  
  };

  authService.checkToken = (token, callback) => {
    let userData;
    try {
      // statements
      userData = jwt.decode(token, tokenSecret);
      if (userData.expire <= Date.now()) {
        throw new Error('Token expired');
      }
    } catch(err) {
      // statements
     return process.nextTick(callback.bind(null,err));
    }

    users.get(userData.username, (err,user)=>{
      if(err)return callback(err);
      callback(null, {username: userData.username})
    })
  }
  return authService;
}