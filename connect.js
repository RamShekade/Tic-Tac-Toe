const crypto = require('crypto');
const session = require("express-session");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require("mongoose");
// Import the Signup model from server.js
const Signup = require("./server.js");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: crypto.randomBytes(32).toString('hex'), // Generate a random secret key
    resave: false,
    saveUninitialized: false 
}));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'views')));

const port = 8080;

// Connect to MongoDB database
// mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Error connecting to MongoDB:', err));

app.get("/", (req, res) => {
    res.render('index.ejs');
});

app.post('/signup', async (req, res) => {
    console.log(req.body);
    const { name, email, password,repassword } = req.body;
    console.log("Hello", name, email, password);
    
        try {
            const newUser = new Signup({
                name: name,
                email: email,
                password: password
            });
            await newUser.save(); // Wait for save operation to complete
            console.log('User saved successfully');
            res.status(200).send('User signed up successfully');
        } catch (err) {
            console.error('Error occurred while saving user:', err);
            res.status(500).send('Internal Server Error');
        }
    
});
const user="";
app.post('/login', async (req, res) => {
    
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await Signup.findOne({ email });

        if (!user) {
            // User not found
            return res.status(404).send('User not found');
        }
        console.log(user);
        // Check if passwords match
        if (!user.name==password) {
            // Passwords don't match
            return res.status(401).send('Invalid password');
        }
        console.log("user log in success ");
        req.session.user = {
            name: user.name,
            email: user.email
        };
        console.log(req.session.user,req.session.secret);

        res.status(200).send('Login successful');
    } catch (err) {
        // Error handling
        console.error('Error occurred while logging in:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.get("/", async(req, res) => {
    res.render('index.ejs', { user:req.session.user});
});
// app.post('/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             console.error('Error occurred while logging out:', err);
//             return res.status(500).send('Internal Server Error');
//         }
//         res.redirect('/'); // Redirect to home page after logout
//     });
// });


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
