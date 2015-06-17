(function($) {

    $(document).ready(function() {

        if ($('html').hasClass('tablet')) {
            $('meta[name="viewport"]').attr('content', 'width=768');
        }

        if ($('html').hasClass('mobile')) {
            $('meta[name="viewport"]').attr('content', 'width=480');
        }

        $('.form-radio span input:checked').parent().addClass('checked');
        $('.form-radio div').click(function() {
            var curName = $(this).find('input').attr('name');
            $('.form-radio input[name="' + curName + '"]').parent().removeClass('checked');
            $(this).find('span').addClass('checked');
            $(this).find('input').prop('checked', true).trigger('change');
        });

        $('input[name="phone"]').mask('+7 (999) 999-99-99');
        $('.form form').submit(function(e) {
            var fieldsValid = true;
            $('.form-block').each(function() {
                $(this).removeClass('error');
                if ($(this).find('.form-radio input').length > 0 && $(this).find('.form-radio input:checked').length == 0) {
                    fieldsValid = false;
                    $(this).addClass('error');
                }
                if ($(this).find('input[name="phone"]').length > 0 && $(this).find('input[name="phone"]').val() == '') {
                    fieldsValid = false;
                    $(this).addClass('error');
                }
            });
            if (!fieldsValid) {
                e.preventDefault();
            }
        });

        $('.auto-slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            if (curSlider.find('li').length > 1) {
                var curHTML = '';
                curSlider.find('li').each(function() {
                    curHTML += '<a href="#"></a>';
                });
                $('.auto-slider-ctrl-inner').html(curHTML);
                $('.auto-slider-ctrl-inner a:first-child').addClass('active');
            } else {
                $('.auto-slider-ctrl').hide();
            }
        });

        $('.auto-slider-next').click(function(e) {
            var curSlider = $('.auto-slider');

            var curIndex = curSlider.data('curIndex');
            curIndex++;
            if (curIndex >= curSlider.find('li').length) {
                curIndex = 0;
            }
            curSlider.data('curIndex', curIndex);
            $('.auto-slider-ctrl-inner a').removeClass('active');
            $('.auto-slider-ctrl-inner a').eq(curIndex).addClass('active');
            curSlider.find('li').css({'position': 'absolute', 'left': -9999, 'top': -9999});
            curSlider.find('li').eq(curIndex).css({'position': 'relative', 'left': 'auto', 'top': 'auto'});

            e.preventDefault();
        });

        $('.auto-slider-prev').click(function(e) {
            var curSlider = $('.auto-slider');

            var curIndex = curSlider.data('curIndex');
            curIndex--;
            if (curIndex < 0) {
                curIndex = curSlider.find('li').length - 1;
            }
            curSlider.data('curIndex', curIndex);
            $('.auto-slider-ctrl-inner a').removeClass('active');
            $('.auto-slider-ctrl-inner a').eq(curIndex).addClass('active');
            curSlider.find('li').css({'position': 'absolute', 'left': -9999, 'top': -9999});
            curSlider.find('li').eq(curIndex).css({'position': 'relative', 'left': 'auto', 'top': 'auto'});

            e.preventDefault();
        });

        $('.auto-slider').on('click', '.auto-slider-ctrl-inner a', function(e) {
            if (!$(this).hasClass('active')) {
                var curSlider = $('.auto-slider');

                var curIndex = $('.auto-slider-ctrl-inner a').index($(this));
                curSlider.data('curIndex', curIndex);
                $('.auto-slider-ctrl-inner a').removeClass('active');
                $('.auto-slider-ctrl-inner a').eq(curIndex).addClass('active');
                curSlider.find('li').css({'position': 'absolute', 'left': -9999, 'top': -9999});
                curSlider.find('li').eq(curIndex).css({'position': 'relative', 'left': 'auto', 'top': 'auto'});
            }

            e.preventDefault();
        });

    });

    $(window).bind('load resize', function() {
        $('.auto-slider').each(function() {
            $(this).find('li').css({'height': 'auto', 'line-height': 'normal'});
            var curHeight = 0;
            $(this).find('li').each(function() {
                if ($(this).height() > curHeight) {
                    curHeight = $(this).height();
                }
            });
            $(this).find('li').css({'height': curHeight, 'line-height': curHeight + 'px'});
        });
    });

})(jQuery);