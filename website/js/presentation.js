// JavaScript Document
(function ($, window) {

    // html elements
    var $viewHTML = $("#story"),
        $chapterButtons = $('#chapters li'),
        isBusyScrolling = false,
        $elementsThatHide = $('.toggle-view');

    var blockScroller = $viewHTML.blockScroll({
        fadeBlocks: false,
        scrollDuration: 500
    });

    // attaches bottom navigation
    $('a', $chapterButtons).on('click', function(evt){
        evt.preventDefault();
        if(!isBusyScrolling){
            isBusyScrolling = true;
            var index = $('a', $chapterButtons).index($(this));
            blockScroller.goto(index+2); // add 2 to match blockScroll's numbering
        }
    });

    $('#start-the-journey').on('click', function(evt){
        evt.preventDefault();
        blockScroller.goto(2); // starts at second frame
    });

    // sets view to correct state
    var adjustElementsToCurrentState = function(){

        $('.screen').each(function(index, obj){
            var $stage = $('.stage',$(obj)),
                fractions = $($stage).fracs(); // Todo: Could have used jQuery's offSetHeight

            if(fractions.visible > 0){
                $(obj).addClass('active');

                // adjust buttons
                var buttonIndex = $(obj).attr('data-button-index');
                $chapterButtons.removeClass('active');
                if(buttonIndex !== 'undefined'){
                    $chapterButtons.eq(buttonIndex).addClass('active');
                }
            } else {
                $(obj).removeClass('active');
            }
        });

        // hide elements when at top or bottom of page
        if(!$(window).scrollTop() || $(window).scrollTop() + $(window).height() == $(document).height()  ) {
            $elementsThatHide.addClass('hidden');
        } else {
            $elementsThatHide.removeClass('hidden');
        }

        // release scroll lock
        isBusyScrolling = false;
    };

    // overlay business
    $('#overlay').overlay();

    $('.close-overlay a').on('click', function(evt){
        evt.preventDefault();
        $('#overlay').trigger('hide');
    });

    $('.overlay-launcher').on('click', function(evt){
        evt.preventDefault();

        // todo: insert new content
        // todo: into overlay here first
        //
        //

        // displays over lay
        $('#overlay-trigger').trigger('click');
    });

    // Menu to Start, End, Overview, PDF etc
    $('#top-menu a').on('click', function(evt){
        evt.preventDefault();

        // todo: create a drop down menus
        alert('todo: create a drop down menus');
    });

    // detects end of scrolling
    $(window).scrollEnd(function(){
        adjustElementsToCurrentState();
    }, 100);

    // sets document to top on page reload
    $(document).ready(function(){
        $(this).scrollTop(0);
    });
    
}(jQuery, window));