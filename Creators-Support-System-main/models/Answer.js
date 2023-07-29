const { ObjectID } = require('mongodb')

const answersCollection = require('../db').db().collection("answers")


let Answer = function(data, ticketId, managerId){
    this.data = data
    this.errors = []
    this.ticketId =  new ObjectID(ticketId)
    this.managerId =  new ObjectID(managerId)
}

Answer.prototype.cleanUp = function(){
    this.data ={
        ticketId : this.ticketId,
        reply: this.data.reply,
        managerId: this.managerId
    }
}


Answer.prototype.saveAnser = async function(){
    this.cleanUp()
    await answersCollection.insertOne(this.data)
}


Answer.prototype.getAnswerByTicketId = async function(Id){
    console.log(Id)
    let answers = await answersCollection.find({ticketId: new ObjectID(Id)}).toArray()
    console.log(answers)
    return answers
}
module.exports = Answer