const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = Schema({
    name: String,
    lastName: String,
    email: { type: String, unique: true, lowercase: true },
    password: { type: String, select: false },
    cellphone: String,
    image: String
})

userSchema.pre('save', function(next) {
    let user = this
    if (!user.isModified('password')) return next()
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => { cb(err, isMatch) });
}

module.exports = mongoose.model('User', userSchema)