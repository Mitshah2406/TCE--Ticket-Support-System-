const Answer = require('../models/Answer')

const ticketController = require('./ticketController')

exports.saveAnswer = async function(req, res){
    let answer = new Answer(req.body, req.params.id, req.session.user_id)
    answer = await answer.saveAnser()
    
await ticketController.changeStatusToOngoing(req.params.id)

    req.flash("success", "Ticket Answered Successfully.")
req.session.save(function() {
  res.redirect('/')
})
}