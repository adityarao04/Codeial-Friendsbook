console.log("hello");


$("#happy").on("click", function(e) {
    console.log('happy');
    $("#happy_content").show()
    $("#happy_content").css('display', 'flex');
    $("#neutral_content").hide()
    $("#sad_content").hide()
    $('.wellnessContainer__showQuizBtn').hide()

});

$("#neutral").on("click", function(e) {
    console.log('neutral');
    $("#neutral_content").show()
    $("#neutral_content").css('display', 'flex');
    $("#happy_content").hide()
    $("#sad_content").hide()
    $('.wellnessContainer__showQuizBtn').hide()

});


$("#sad").on("click", function(e) {
    console.log('sad');
    $("#sad_content").show()
    $("#sad_content").css('display', 'flex');
    $("#happy_content").hide()
    $("#neutral_content").hide()
    $('.wellnessContainer__showQuizBtn').show()

});


$('.wellnessContainer__showQuizBtn').on('click', function(e) {

    $('iframe').toggle()
});