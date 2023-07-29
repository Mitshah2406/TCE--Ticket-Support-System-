const bcrypt = require("bcryptjs")
const managersCollection = require('../db').db().collection("managers")
const validator = require("validator")
const nodemailer=require('nodemailer');

// const md5 = require('md5')


let Manager = function(data) {
    this.data = data
    this.errors = []
  }


Manager.prototype.getManagerById = async function(managerId){
    console.log(managerId)
let manager = await managersCollection.findOne({_id: managerId})
console.log(manager)
return manager
}


Manager.prototype.sendMail= function(toMailId, campName, ticketTitle, managerName){
        console.log("Send Mail Function called")
        // res.send("check console!")
      transporter.sendMail( {
      from:'sharpcoders69@gmail.com',
      to: toMailId,
      subject: "New Ticket Recieved" ,
      text:`
      Hello ${managerName}, there is a new ticket for you.
      Campaign Name : ${campName} 
      Ticket Title : ${ticketTitle}
      Go and check out the whats happening, in the dashboard now!!
      `}, function(error,info){
        if(error){
          console.log(error)
        } else{
          console.log('Email sent: ' + info.response)
        }
      })
      }


      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
          user: 'sharpcoders69@gmail.com',
          pass: 'vidyalankar'
        }
      })


      Manager.prototype.getAllManagers = async function(){
        let managers = await managersCollection.find({}).toArray()
        return managers
      }

module.exports = Manager