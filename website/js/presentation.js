// JavaScript Document
(function ($, window) {

    var $viewHTML = $("#story"),
        $chapterButtons = $('#chapters li'),
        isBusyScrolling = false;

    var blockScroller = $viewHTML.blockScroll({
        fadeBlocks: false
        // scrollDuration: '500'
    });

    $('a', $chapterButtons).on('click', function(evt){
        evt.preventDefault();
        if(!isBusyScrolling){
            isBusyScrolling = true;
            var index = $('a', $chapterButtons).index($(this));
            blockScroller.goto(index+2); // Adding 2 to match blockScroll's numbering
        }
    });

    $('#overlay').overlay();

    $('.close-overlay a').on('click', function(){
        $('.overlay#overlay').trigger('hide');
    });

    $('.overlay-launchers').on('click', function(evt){
        evt.preventDefault();
        $('#overlay-trigger').trigger('click');
    });

    var adjustViewToVisibleScreen = function(){
        $('.screen').each(function(index, obj){
            var $stage = $('.stage',$(obj)),
                fractions = $($stage).fracs(); // Todo: Could have used jQuery's offSetHeight

            if(fractions.visible > 0){
                $(obj).addClass('active');

                // adjust buttons
                var buttonIndex = $(obj).attr('data-button-index');
                $chapterButtons.removeClass('active');
                $chapterButtons.eq(buttonIndex).addClass('active');

                // release scroll lock
                isBusyScrolling = false;

            } else {
                $(obj).removeClass('active');
            }
        });
    };

    $('#top-menu a').on('click', function(evt){
        evt.preventDefault();
        //alert('Ha!, I knew you were going to do that, this button does nothing.');
        $('#overlay-trigger').trigger('click');
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
        adjustViewToVisibleScreen();
    }, 100);

    $(document).ready(function(){
        $(this).scrollTop(0);
    });

  
    
}(jQuery, window));