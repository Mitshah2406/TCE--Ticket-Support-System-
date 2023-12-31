const bcrypt = require("bcryptjs")
const influencersCollection = require('../db').db().collection("influencers")
const validator = require("validator")

// const md5 = require('md5')


let Influencer = function(data) {
    this.data = data
    this.errors = []
  }


Influencer.prototype.cleanUp = function() {
    if (typeof(this.data.username) != "string") {this.data.username = ""}
    if (typeof(this.data.email) != "string") {this.data.email = ""}
    if (typeof(this.data.password) != "string") {this.data.password = ""}
  
    // get rid of any bogus properties
    this.data = {
      username: this.data.username.trim().toLowerCase(),
      email: this.data.email.trim().toLowerCase(),
      password: this.data.password
      //The below property is for testing and can be removed in the next update.
      // role: "influencer"
      //campaihn active:
    }
  }

  Influencer.prototype.validate = function() {
    return new Promise(async (resolve, reject) => {
      if (this.data.username == "") {this.errors.push("You must provide a username.")}
      if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {this.errors.push("Username can only contain letters and numbers.")}
      if (!validator.isEmail(this.data.email)) {this.errors.push("You must provide a valid email address.")}
      if (this.data.password == "") {this.errors.push("You must provide a password.")}
      if (this.data.password.length > 0 && this.data.password.length < 7) {this.errors.push("Password must be at least 7 characters.")}
      if (this.data.password.length > 50) {this.errors.push("Password cannot exceed 50 characters.")}
      if (this.data.username.length > 0 && this.data.username.length < 3) {this.errors.push("Username must be at least 3 characters.")}
      if (this.data.username.length > 30) {this.errors.push("Username cannot exceed 30 characters.")}
    
      // Only if username is valid then check to see if it's already taken
      if (this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)) {
        let usernameExists = await influencersCollection.findOne({username: this.data.username})
        if (usernameExists) {this.errors.push("That username is already taken.")}
      }
    
      // Only if email is valid then check to see if it's already taken
      if (validator.isEmail(this.data.email)) {
        let emailExists = await influencersCollection.findOne({email: this.data.email})
        if (emailExists) {this.errors.push("That email is already being used.")}
      }
      resolve()
    })
  }



  Influencer.prototype.login = function() {
    return new Promise((resolve, reject) => {
      this.cleanUp()

      influencersCollection.findOne({username: this.data.username}).then((attemptedUser) => {
        if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
          this.data = attemptedUser
          resolve("Congrats!")
        } else {
          reject("Invalid username / password.")
        }
      }).catch(function() {
        reject("Please try again later.")
      })
    })
  }


  Influencer.prototype.register = function() {
    return new Promise(async (resolve, reject) => {
      // Step #1: Validate user data
      this.cleanUp()
      await this.validate()
    
      // Step #2: Only if there are no validation errors 
      // then save the user data into a database
      if (!this.errors.length) {
        // hash user password
        let salt = bcrypt.genSaltSync(10)
        this.data.password = bcrypt.hashSync(this.data.password, salt)
        await influencersCollection.insertOne(this.data)
        resolve()
      } else {
        reject(this.errors)
      }
    })
  }

module.exports = Influencer
