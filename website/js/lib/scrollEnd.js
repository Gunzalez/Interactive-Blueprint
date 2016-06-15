/**
 * Created by Gunzalez on 16/06/2016.
 */
(function ($) {
    $.fn.scrollEnd = function(callback, timeout) {
        $(this).scroll(function(){
            var $this = $(this);
            if ($this.data('scrollTimeout')) {
                clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback,timeout));
        });
    };
})(jQuery);
