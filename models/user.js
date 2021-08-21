const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const pageSchema = new mongoose.Schema(
    {
        title: String,
        priority: String,
        questions: [String],
        answers: [String]
    },
    { timestamps: true }
);

const userSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Please enter your name']},
    email: {
        type: String, 
        required: [true, 'Please enter an email'], 
        unique: true, 
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String, 
        required: [true, 'Please enter a password'], 
        minlength: [6, 'Minimum password length is 6 characters']
    },
    pages: { 
        type: [pageSchema], 
        default: [
            {
                title: "Get started with Q&As",
                priority: "unset",
                questions: ["What are Q&As?", "How does it work?", "How writing questions helps?"],
                answers: ["Q&As are one of the strategies used in active recall.", "Instead of copying down your course directly out of the text book, try to write questions.", "The idea is that instead of passively reading or highlighting the information as we’re often tempted to do, we’re forced to actively engage in cognitive effort: by, first, retrieving the information from the learning material and rewriting it in the form of questions with our own words, and second, by, testing ourselves and answering the questions, which strengthens connections between information in our brains and improves our ability to recall that information when needed."]
            }
        ]
    }
});

// hash passwords before saving them to the database
userSchema.pre('save', async function (next) {
    // if the password is already hashed, don't hash it again (a hashed password's length is 60)
    if (this.password.length >= 60) {
        next();
    }
    else {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }  
});

// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email');
}

const User = mongoose.model('User', userSchema);

module.exports = User;