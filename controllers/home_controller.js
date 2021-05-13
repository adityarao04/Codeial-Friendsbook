module.exports.home = function(req, res) {
    // check cookies
    console.log(req.cookies);
    // change cookies
    res.cookie('user_id', 25);
    res.cookie('new_id', 4678);

    // return res.end('<h1>Express is up for codeial</h1>');
    return res.render('home', {
        title: "Home"
    });

}



// module.exports.actionName = function(req,res){}