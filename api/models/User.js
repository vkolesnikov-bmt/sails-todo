/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

  attributes: {
     username: {
       type: 'string',
       required: true,
       unique: true
     },
     password: {
       type: 'string',
       required: true
     },
     todos: {
       collection: 'todo',
       via: 'owner'
     },
     toJSON: function(){
       var obj = this.toObject();
       delete obj.password;
       return obj;
     },
  },
  beforeCreate: function(user,cb){
    bcrypt.genSalt(saltRounds, function(err,salt){
      bcrypt.hash(user.password, salt, function(err,hash){
        if(err) return cb(err);
        user.password = hash;
        cb();
      })
    })
  }
};

