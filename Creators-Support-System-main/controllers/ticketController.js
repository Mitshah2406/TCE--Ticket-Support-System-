const Campaign = require("../models/Campaign")
const Ticket = require("../models/Ticket")
const Answer = require("../models/Answer")
const Manager = require("../models/Manager")

//npm install nodemailer

exports.raiseTicket = async function(req, res){
    try{


let ticket = new Ticket(req.body, req.params.id, req.session.user._id)
// console.log("Hi:" + req.params.id)
await ticket.raiseTicket()


let campaign = new Campaign()
// console.log(req.params.id)
let campaignDoc= await campaign.findCampaignById(req.params.id)
// console.log(manager.managerId)

let manager = new Manager()
let managerDoc = await manager.getManagerById(campaignDoc.managerId)
// console.log(managerDoc.username)

manager.sendMail(managerDoc.email, campaignDoc.campaignName, req.body.title, managerDoc.username)


// sendMail= function(req,res){
//     console.log("Send Mail Function called")
//     res.send("check console!")
//   transporter.sendMail( {
//   from:'kush2004kapadia@gmail.com',
//   to: managerDoc.email,
//   subject: "Test",
//   text:"To Atharva"}, function(error,info){
//     if(error){
//       console.log(error)
//     } else{
//       console.log('Email sent: ' + info.response)
//     }
//   })
//   }

  

req.flash("success", "Ticket Added Successfully.")
req.session.save(function() {
  res.redirect('/')

})
    }
    catch(e){
        console.log(e)
    }
}






exports.displayTicketForm= async function(req,res){
    console.log(req.params.id)
    let campaign = await new Campaign().findCampaignById(req.params.id)
    res.render('raise-ticket-form', {
        campaign: campaign
    })
}


exports.openReplyForm = async function(req, res){

    let ticket = new Ticket()
    let ticketData= await ticket.findTicketById(req.params.id)
// console.log(ticketData)

let manager = new Manager()
let managers = await manager.getAllManagers()
    res.render('ticket-reply-form',{
        ticket: ticketData,
        username: req.session.user.username,
        managers: managers
    })
}

exports.viewTicket_influencer = async function(req, res){
    let ticket = new Ticket()
    let ticketData= await ticket.findTicketById(req.params.id)

    let answer = new Answer()
    let answerToTicket = await answer.getAnswerByTicketId(req.params.id)
    console.log(answerToTicket)
    res.render('viewticketdetails-influencer',{
        ticket:ticketData,
        answers: answerToTicket
        })
  }


  exports.closeTicket = async function(req, res){
      let ticket = new Ticket()
      await ticket.closeTicket(req.params.id)
      req.flash("success", "Ticket Closed Successfully.")
req.session.save(function() {
  res.redirect('/')

})
  }

  exports.changeStatusToOngoing = async function(ticketId){
      let ticket = new Ticket()
      await ticket.changeStatusToOngoing(ticketId)
  }


  exports.assignTicket = async function(req,res){
      if(req.body.assignedManager == "undefined"){
        req.flash("errors", "You can't assign ticket to yourself.")
        req.session.save(function() {
    //   console.log(req.params)

          res.redirect(`/answer-ticket/${req.params.id}`)
        
        })
      }
      else{
let ticket = new Ticket()
await ticket.assignTicket(req.params.id, req.body.assignedManager)
req.flash("success", "Ticket Assigned Successfully.")
        req.session.save(function() {
    //   console.log(req.params)
          res.redirect('/')
        })
      }
  }