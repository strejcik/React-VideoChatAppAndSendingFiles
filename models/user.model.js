const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;


const UserSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    userId: {
        type: String,
        default: "",
        required: true
    },
    username: {
        type: String, 
        lowercase: true, 
        unique: true, 
        required: [true, "can't be blank"], 
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
        index: true
    },
    email: {
        type: String, 
        lowercase: true, 
        unique: true, 
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true
    },
    firstname: {
        type: String,
        lowercase: false,
        required: [true, "can't be blank"], 
    },
    surname: {
        type: String,
        lowercase: false,
        required: [true, "can't be blank"], 
    },
    followings: {
        type: Array,
        default: [],
    },
    is_active: { type: Boolean, default: false },
    hash: String,
    salt: String
},{ timestamps: true });



UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);

    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, "3t08hwoghouasbfsieugb");
}

UserSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        username: this.username,
        followings: this.followings,
        token: this.generateJWT(),
    }
};


module.exports = mongoose.model('User', UserSchema);
