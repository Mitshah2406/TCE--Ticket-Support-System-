const Campaign = require('../models/Campaign')

exports.addCampaign = async function(req, res){
    let campaign = new Campaign()
    await campaign.addCampaign()
    res.send("Added")
}

exports.getAllCampaigns = async function(rq, res){
    let campaign = new Campaign()
let allCampaigns = await campaign.getAllCampaigns()



res.render('all-campaigns-influencer',{
    campaigns: allCampaigns
})
}