const campaignsCollection = require('../db').db().collection("campaigns")
const ObjectID = require('mongodb').ObjectID

let Campaign= function(data) {
    this.data = data
    this.errors = []
  }


Campaign.prototype.cleanUp = function(){

    // this.data = {
    //         campaignName: this.data.campaignName,
    //         startDate: this.data.CampaignStartDate,
    //         EndDate: this.data.CampaignEndDate,
    //         activeInfluencerIds: [2,3,4,5]
   //          managerId: new ObjectID("")        
    // }
    this.data = {
            campaignName: "Camapign 1",
            startDate: new Date(),
            EndDate: new Date(),
            influencerId: [new ObjectID("6240204e48196b692fd40ea6")],
            managerId: new ObjectID("62402d82e3d136a37786bdac")    
    }
}

Campaign.prototype.addCampaign = async function(){
  this.cleanUp()
  campaignsCollection.insertOne(this.data)
}

Campaign.prototype.getCampaigns = async function(managerId){
  let campaigns = await campaignsCollection.find({managerId: new ObjectID(managerId)}).toArray()
  // console.log(campaigns)
  return campaigns
}

Campaign.prototype.getAllCampaigns = async function(managerId){
  let campaigns = await campaignsCollection.find({}).toArray()
  // console.log(campaigns)
  return campaigns
}

Campaign.prototype.findCampaignById = async function(Id){
  // console.log(Id)
  let campaign = await campaignsCollection.find({_id: new ObjectID(Id)}).toArray()
  return campaign[0]
}


Campaign.findByCampaignId = function(id){


  return new Promise(async function(resolve,reject){
    //if statement goes here
    if(typeof(id)!="string" || !ObjectID.isValid(id) ){
      reject()
      return
    }
    let prospects = await sittingCollection.aggregate([
      {$match: {clientID: new ObjectID(id) }},
      {$lookup: {from: "prospect", localField: "clientID", foreignField: "_id", as: "sessionDocument"}},
      {$project: {
        sessionDate: 1,
        clientName:1,
        sessionType:1,
        standardProcess:1,
        systProcess:1,
        standardProcess:1,
        timeWasted:1,
        paymentMethod:1,
        notes:1,
        totalHours:1,
        billingAmount:1,
        createdDate:1,
        //clientID: {}
         

      }}
    
    ]).toArray()
    //if(prospects.length){
      console.log(prospects)
      resolve(prospects)
   // }
   // else{
   // console.log(id)

   // }
  })
}

module.exports = Campaign