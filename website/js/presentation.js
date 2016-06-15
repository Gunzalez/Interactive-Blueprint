// JavaScript Document
(function ($, window) {

     //$("#main-wrap").blockScroll({
     //     scrollDuration: [jQuery duration],
     //     fadeBlocks: [bool],
     //     fadeDuration: [jQuery duration]
     //});

    var blockScroller = $("#story").blockScroll({fadeBlocks:false});
    $("#Intro-button").click(function() { blockScroller.goto(1); });
    $("#About-button").click(function() { blockScroller.goto(3); });
    $("#Features-button").click(function() { blockScroller.goto(4); });
    $("#Download-button").click(function() { blockScroller.goto(7); });
    $("#Install-button").click(function() { blockScroller.goto(8); });
    $("#Customize-button").click(function() { blockScroller.goto(12); });
    $("#Use-button").click(function() { blockScroller.goto(16); });
    $("#Dot-button").click(function() { blockScroller.goto(18); });


    var whichFrameIsVisible = function(){
        $('.screen').each(function(index, obj){
            var $stage = $('.stage',$(obj)),
                fractions = $($stage).fracs(); // Todo: See using jQuery's offSetHeight

            if(fractions.visible > 0){
                $(obj).addClass('active');
            } else {
                $(obj).removeClass('active');
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

    $(window).scrollEnd(function(){
        whichFrameIsVisible();
    }, 100);

    $(document).ready(function(){
        $(this).scrollTop(0);
    });

  
    
}(jQuery, window));