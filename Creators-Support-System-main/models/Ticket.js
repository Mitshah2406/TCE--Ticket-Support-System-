const { ObjectID } = require('mongodb')

const ticketsCollection = require('../db').db().collection("tickets")

let Ticket = function(data, campaignId, influencerId) {
    this.data = data
    this.errors = []
    this.campaignId = new ObjectID(campaignId)
    this.influencerId = new ObjectID(influencerId)
  }

  Ticket.prototype.cleanUp = function(){
    if (typeof(this.data.title) != "string") {this.data.title = ""}
    if (typeof(this.data.body) != "string") {this.data.body = ""}
    
    this.data = {
        ticketTitle: this.data.title,
        ticketBody : this.data.body,
        campaignId : this.campaignId, //has to be thought ho to take in
        raisedDate: new Date(),
        influencerId: this.influencerId,  //has to be thought ho to take in
        ticketStatus: "Open",
        category: this.data.category,
        assignedTo: null
        // issueImg: ,
    }
  }


  Ticket.prototype.raiseTicket = async function(){
    this.cleanUp()
    // console.log(this.data)
 await ticketsCollection.insertOne(this.data)
  }

  Ticket.prototype.editTicket = function(){}

  Ticket.prototype.DeleteTicket = function(){}

  Ticket.prototype.getAllTickets=async function(){
let allTickets = await ticketsCollection.find().toArray()
return allTickets
  }


Ticket.prototype.findTicketbyCampaignId = async function(id){
  console.log(id)
  let tickets = await ticketsCollection.find({campaignId: id}).toArray()
  // console.log(tickets[0])
  return tickets
    }


    Ticket.prototype.findTicketById =async  function(id){
      let ticket = await ticketsCollection.findOne({_id: new ObjectID(id)})
      console.log(ticket.ticketBody)
      return ticket
    }



    Ticket.prototype.getTicketsByInfluencerId = async function(id){
      // console.log(id)
      let tickets = await  ticketsCollection.find({influencerId: new ObjectID(id)}).toArray()
      // console.log(tickets)
      return tickets
    }

Ticket.prototype.closeTicket = async function(TticketId){
await ticketsCollection.findOneAndUpdate({_id: new ObjectID(TticketId)}, {$set: {ticketStatus: "Closed"}})
}

Ticket.prototype.changeStatusToOngoing = async function(TticketId){
await ticketsCollection.findOneAndUpdate({_id: new ObjectID(TticketId)}, {$set: {ticketStatus: "Ongoing"}})
}


Ticket.prototype.assignTicket = async function(ticketId,managerUsername){

await ticketsCollection.findOneAndUpdate({_id: new ObjectID(ticketId)}, {$set:{assignedTo: managerUsername}})
}

  module.exports = Ticket