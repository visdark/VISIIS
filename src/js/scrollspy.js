// 滚动监听插件
    /*============================================
     Navigation Functions
     ==============================================*/
    if ($(window).scrollTop()< 10){
        $('#top').removeClass('scrolled');
    }
    else{
        $('#top').addClass('scrolled');
    }

    $(window).scroll(function(){
        if ($(window).scrollTop()< 10){
            $('#top').removeClass('scrolled');
        }
        else{
            $('#top').addClass('scrolled');
        }
    });