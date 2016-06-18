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

    function commaSeparateNumber (val){
        while (/(\d+)(\d{3})/.test(val.toString())){
            val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
        return val;
    }

    // sets view to correct state
    function adjustElementsToCurrentState(){

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

                // get count down/up values
                var daysStart = $(obj).attr('data-count-days-start');
                var daysEnd = $(obj).attr('data-count-days-end');
                var leadsStart = $(obj).attr('data-count-leads-start');
                var leadsEnd = $(obj).attr('data-count-leads-end');

                if(daysStart !== 'undefined'){
                    $({someValue: daysStart}).animate({someValue: daysEnd}, {
                        duration: 1500,
                        easing:'swing',
                        step: function() {
                            $('#days').text(commaSeparateNumber(Math.round(this.someValue)));
                        }
                    });
                }

                if(leadsStart !== 'undefined'){
                    $({someValue: leadsStart}).animate({someValue: leadsEnd}, {
                        duration: 1000,
                        easing:'swing',
                        step: function() {
                            $('#leads').text(commaSeparateNumber(Math.round(this.someValue)));
                        }
                    });
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
    }

    // overlay business
    $('#overlay').overlay();

    $('.close-overlay a').on('click', function(evt){
        evt.preventDefault();
        $('#overlay').trigger('hide');
    });

    $('.video-launcher').on('click', function(evt){
        evt.preventDefault();

        // todo: insert new content
        // todo: into overlay here first
        //
        //

    });

    $('.overlay-launcher').on('click', function(evt){
        evt.preventDefault();

        // todo:
        // insert new content
        // into overlay here first
        //
        //

        // display overlay
        $('#overlay-trigger').trigger('click');
    });

    // Menu to Start, End, Overview, PDF etc
    $('#top-menu a').on('click', function(evt){
        evt.preventDefault();

        // todo: create a drop down menus
        alert('todo: create a drop down menus');
    });

    // detect end of scrolling
    $(window).scrollEnd(function(){
        adjustElementsToCurrentState();
    }, 100);

    $(document).scroll(function(){
        console.log('started');
    }, 100);


    // set document to top on page reload
    // $(this).scrollTop(0);

}(jQuery, window));