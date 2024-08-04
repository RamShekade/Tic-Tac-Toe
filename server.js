const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dbName = 'studysync';
const mongoUrl ="mongodb://localhost:27017";

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully to MongoDB');
  })
  .catch((err) => {
    console.error('Error occurred while connecting to MongoDB', err);
  });

  const signupSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true
    }
  });

  const chatSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    msg: {
      type: String,
      required: true
    }
  });
  signupSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};


  
const Chat = mongoose.model('Chat', chatSchema);
const Signup = mongoose.model('Signup', signupSchema);
module.exports= {Signup,Chat};



