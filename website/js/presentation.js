// JavaScript Document
(function ($, window) {

     //$("#main-wrap").blockScroll({
     //     scrollDuration: [jQuery duration],
     //     fadeBlocks: [bool],
     //     fadeDuration: [jQuery duration]
     //});

    var blockScroller = $("#main-wrap").blockScroll({fadeBlocks:false});
    $("#Intro-button").click(function() { blockScroller.goto(1); });
    $("#About-button").click(function() { blockScroller.goto(3); });
    $("#Features-button").click(function() { blockScroller.goto(4); });
    $("#Download-button").click(function() { blockScroller.goto(7); });
    $("#Install-button").click(function() { blockScroller.goto(8); });
    $("#Customize-button").click(function() { blockScroller.goto(12); });
    $("#Use-button").click(function() { blockScroller.goto(16); });
    $("#Dot-button").click(function() { blockScroller.goto(18); });

    //if ($('#frame3').visible(true)) {
    //    console.log('Hey it\'s me');
    //} else {
    //    // The element is NOT visible, do something else
    //}

    var whichFrameIsVisible = function(){
        $('.screen').each(function(index, obj){
            var $screen = $('.stage',$(obj));
            if($screen.visible(true)){
                console.log('Beats');

                var fracs = $($screen).fracs();
                console.log(fracs);
                if(fracs > 50){
                    //console.log($('.stage',$(obj)));
                    $(obj).addClass('active-frame');
                    console.log($(obj).attr('id'));
                }

            } else {
                $(obj).removeClass('active-frame');
            }
        });
    };

    $('.trigger-1').on('click', function(evt){
        evt.preventDefault();
        $('.action-1').addClass('play-misty');
    });

    $.fn.scrollEnd = function(callback, timeout) {
        $(this).scroll(function(){
            var $this = $(this);
            if ($this.data('scrollTimeout')) {
                clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback,timeout));
        });
    };

    // how to call it (with a 1000ms timeout):
    $(window).scrollEnd(function(){
        //alert('stopped scrolling');
        whichFrameIsVisible();
    }, 100);

    $(document).ready(function(){
        $(this).scrollTop(0);
    });

  
    
}(jQuery, window));