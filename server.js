const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dbName = 'studysync';
const mongoUrl = process.env.url; // Assuming your MongoDB connection URL is in the environment variable MONGO_URL

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
  signupSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};


  

const Signup = mongoose.model('Signup', signupSchema);
module.exports = Signup;


