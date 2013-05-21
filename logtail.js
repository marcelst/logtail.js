var lastByte = 0;
var url = "http://localhost/~marcel/motd.txt";
var scrollWithData = true;

function tailf() {
     $.ajax({type: "GET",
            url: url,
            headers : { "Range" : 'bytes=' + parseInt(lastByte) + "-" },
            success : function(data, textStatus) {
                lastByte += data.length
                $("#thePlace").append(data);
                
                if (scrollWithData) {
                //    $(window).scrollTop($('#page_bottom').offset().top);
                }
            }
           })
}
      
var timer;
$(window).bind('scroll',function () {
    clearTimeout(timer);
    timer = setTimeout( refresh , 500);
    console.log("scrolling")
    var div = $('#page_bottom')
    if($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
        div.text("Following...")
    } else {
        div.text("Follow")
    }
});

var $viewport = $('html, body');


// Stop the animation if the user scrolls. Defaults on .stop() should be fin
$viewport.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e){
    if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
        //               $viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup'); 
        jQuery.scrollTo.window().stop(true);
        console.log("test")
        // This identifies the scroll as a user action, stops the animation, then unbinds the event straight after (optional)
    }
});   

var refresh = function () { 
    console.log('Stopped Scrolling');
    if($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
        scrollWithData = true
        var div = $('#page_bottom')
        console.log("near bottom!");
        $('html,body').animate({ scrollTop: div.offset().top }, 5000);
    } else {
        scrollWithData = false
        $('#page_bottom').text("Follow")
        console.log("off!");
    }

};


