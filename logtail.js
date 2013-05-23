var lastByte = 0;
var url = "http://localhost/~marcel/motd.txt";
var scrollWithData = true;

function tailf() {
     $.ajax({type: "GET",
            url: url,
            headers : { "Range" : 'bytes=' + (lastByte-1) + "-" },
            success : function(data, textStatus) {
                data = data.substr(1)
                lastByte += data.length;
                $("#thePlace").append(data);
            }
           });
}
      
var timer, timer2;
$(window).bind('scroll',function () {
});

$('body,html').bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup', function(e){
 if ( e.which > 0 || e.type == "mousedown" || e.type == "mousewheel"){
  $("html,body").stop();
       clearTimeout(timer);
    clearTimeout(timer2);
    timer = setTimeout(refresh , 100);
    var div = $('#page_bottom');
    if($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
        div.text("Following...");
        var div = $('#page_bottom');
     //   $viewport.animate({ scrollTop: div.offset().top }, 5000);
    } else {
//        div.text("Follow");
    }
 }
})

var $viewport = $('html, body');
var $div = $('#page_bottom');


var refresh = function () { 
    console.log('Stopped Scrolling');
    if($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
        scrollWithData = true;
        $('html, body').animate({ scrollTop: $('#page_bottom').offset().top }, 1000, "swing", function() {
           timer2 = setTimeout(follow, 100);
        });
    } else {
        scrollWithData = false;
        $('#page_bottom').text("Follow");
    }

};

var follow = function () {
    $(window).scrollTop($('#page_bottom').offset().top);
    $('html,body').dequeue("custom")
    timer2 = setTimeout(follow, 100);
}
