$(window).load(function () {

    $(".elementMenu").each(function (index) {
 
        if ($(this).parent("li").is(':has(ul)')) {
            $(this).children("b").attr("class", "caret");
        }
        else {
            $(this).children("b").attr("class", "noCaret");
        }
    });
});
