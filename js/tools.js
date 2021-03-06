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

        $('input[name="phone"]').val('').mask('+7 (999) 999-99-99', {completed: function(){ $('.form-phone-submit input').addClass('active'); }});
        $('input[name="phone"]').change(function() {
            if ($(this).val() == '') {
                $('.form-phone-submit input').removeClass('active');
            }
        });
        $('.form form').submit(function(e) {
            var fieldsValid = true;
            $('.form-block').each(function() {
                $(this).removeClass('error');
                if ($(this).find('.form-radio input').length > 0 && $(this).find('.form-radio input:checked').length == 0) {
                    fieldsValid = false;
                    $(this).addClass('error');
                    $('.form-hint').show();
                }
                if ($(this).find('input[name="phone"]').length > 0 && $(this).find('input[name="phone"]').val() == '') {
                    fieldsValid = false;
                    $(this).addClass('error');
                    $('.form-hint').show();
                }
            });
            if (!fieldsValid) {
                e.preventDefault();
            }
        });

        $('#city').change(function() {
            switch ($(this).val()) {
                case '':
                    $('#dealer').html('<option value="">-</option>');
                    break;
                case '1':
                    $('#dealer').html('<option value="">-</option><option value="1">Московский дилер 1</option><option value="2">Московский дилер 2</option><option value="3">Московский дилер 3</option>');
                    break;
                case '2':
                    $('#dealer').html('<option value="">-</option><option value="1">Петербургский дилер 1</option><option value="2">Петербургский дилер 2</option><option value="3">Петербургский дилер 3</option>');
                    break;
            }
            $('#dealer').trigger('chosen:updated');
        });

        $('select').chosen({disable_search: true});

        $('.special-form form').submit(function(e) {
            var fieldsValid = true;
            $('.special-form-block').each(function() {
                $(this).removeClass('error');
                if ($(this).find('input[name="phone"]').length > 0 && $(this).find('input[name="phone"]').val() == '') {
                    fieldsValid = false;
                    $(this).addClass('error');
                    $('.special-form-hint').show();
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

        $('.auto-colors-list a').click(function(e) {
            var curIndex = $('.auto-colors-list a').index($(this));
            $('.auto-slider-ctrl-inner a:first').click();
            if ($(this).hasClass('views')) {
                $('.auto-slider-ctrl').css({'visibility': 'visible'});
            } else {
                $('.auto-slider-ctrl').css({'visibility': 'hidden'});
            }
            $('.auto-slider li').each(function() {
                if ($(this).find('img').eq(curIndex).length == 1) {
                    $(this).find('img').css({'position': 'absolute', 'left': -9999, 'top': -9999});
                    $(this).find('img').eq(curIndex).css({'position': 'relative', 'left': 'auto', 'top': 'auto'});
                } else {
                    $(this).find('img').css({'position': 'relative', 'left': 'auto', 'top': 'auto'});
                }
            });
            $('.auto-colors-list a').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });

        $('.auto-colors-list a.active').click();

        $('.auto-list').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0)
        });

        $('.auto-list-next').click(function(e) {
            var curSlider = $(this).parents().filter('.auto-list');

            var curIndex = curSlider.data('curIndex');
            curIndex++;
            if (curIndex > curSlider.find('.auto-list-row').length - 1) {
                curIndex = 0;
            }
            curSlider.data('curIndex', curIndex)
            $('.auto-list-row').stop(true, true);
            $('.auto-list-row:visible').fadeOut(function() {
                $('.auto-list-row').eq(curIndex).fadeIn();
            });

            e.preventDefault();
        });

        $('.auto-list-prev').click(function(e) {
            var curSlider = $(this).parents().filter('.auto-list');

            var curIndex = curSlider.data('curIndex');
            curIndex--;
            if (curIndex < 0) {
                curIndex = curSlider.find('.auto-list-row').length - 1;
            }
            curSlider.data('curIndex', curIndex)
            $('.auto-list-row').stop(true, true);
            $('.auto-list-row:visible').fadeOut(function() {
                $('.auto-list-row').eq(curIndex).fadeIn();
            });

            e.preventDefault();
        });

    });

    $(window).bind('load resize', function() {
        $('.auto-list').each(function() {
            $(this).find('.auto-list-item a').css({'height': 'auto'});
            var curHeight = 0;
            $(this).find('.auto-list-item a').each(function() {
                if ($(this).height() > curHeight) {
                    curHeight = $(this).height();
                }
            });
            $(this).find('.auto-list-item a').css({'height': curHeight});
        });
    });

})(jQuery);