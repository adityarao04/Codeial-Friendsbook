module.exports.wellness = function(req, res) {
    return res.render('wellness', {
        title: 'MEET+ | Wellness'
    })
}

module.exports.therapy = function(req, res) {
    return res.render('therapy', {
        title: 'MEET+ | Therapy'
    })
}