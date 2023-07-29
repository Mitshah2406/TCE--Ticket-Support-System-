const express= require('express')
const router = express.Router()
const Ticket = require('./models/Ticket')
const userController = require('./controllers/userController')
const campaignController = require('./controllers/campaignController')
const ticketController = require('./controllers/ticketController')
const answerController = require('./controllers/answerController')


router.get('/', userController.home)
router.post('/register', userController.register)
router.get('/signin', userController.signin)
router.get('/signUp', userController.signUp)
router.post('/login', userController.login)
router.post('/logout', userController.logout)


//Testing purposes
router.get('/add', campaignController.addCampaign)
//Campaign related  routes
router.get('/all-campaigns-influencer', campaignController.getAllCampaigns)

//ticket related routes
router.post('/raise-ticket/:id',  ticketController.raiseTicket)
router.get('/raise-ticket-form/:id',userController.mustBeInfluencer, ticketController.displayTicketForm)
router.post('/accept-to-close/:id', ticketController.closeTicket)
router.post('/assign-ticket/:id', ticketController.assignTicket)

//frontend manager related
router.get('/idk', userController.pageLoad)
router.get('/dashboard', userController.displayDashboard)
router.get('/answer-ticket/:id', userController.mustBeManager ,ticketController.openReplyForm)
router.post('/answer-ticket/:id', userController.mustBeManager ,answerController.saveAnswer)
router.get('/view-ticket-details/:id',ticketController.viewTicket_influencer)


module.exports = router
