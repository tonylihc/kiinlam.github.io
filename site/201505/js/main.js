$(document).ready(function(){
	var timeout         = 300;
	var closetimer		= 0;
	var ddmenuitem      = null;

	function dropmenu_open(){
		dropmenu_canceltimer();
		dropmenu_close();
		ddmenuitem = $(this).find('ul').eq(0).css('display', 'block');
	}

	function dropmenu_close(){
		if(ddmenuitem) {
            ddmenuitem.css('display', 'none');
		}
	}

	function dropmenu_timer(){
		closetimer = window.setTimeout(dropmenu_close, timeout);
	}

	function dropmenu_canceltimer(){
		if(closetimer){
			window.clearTimeout(closetimer);
			closetimer = null;
		}
	}
	
	$('#dropmenu > li').bind('mouseover', dropmenu_open);
	$('#dropmenu > li').bind('mouseout',  dropmenu_timer);
});

$(document).ready(function(){
    var timeout = 3000;
    var timer = 0;
    var root = $('#sl_container');
    var container = root.find('.slides_container');
    var items = container.find('a');
    var switcher = root.find('.pagination');
    var length = items.length;
	var curItem = null;
    var nextItem = null;
    var cur = 0;
    var next = 1;

    function init() {
        var tmpl = '<li data-idx="{{i}}"><span> </span></li>';
        var i = 0;
        var str = '';
        for (; i < length; i++) {
            str += tmpl.replace('{{i}}', i);
        }
        switcher.append(str);
        switcher.find('li:eq(0)').addClass('cur');
        curItem = items.eq(cur);
        nextItem = items.eq(next);
        switcher.on('click', 'li', switcherClick);
        setTimer();
    }

    function setTimer(){
        timer = window.setTimeout(move, timeout);
    }

	function move(){
        switcher.find('li').removeClass('cur').eq(next).addClass('cur');
        nextItem.addClass('next').animate({left:0}, 1000, 'swing', moveEnd);
	}

    function moveEnd(){
        curItem.removeClass('cur').css('left', '1002px');
        nextItem.addClass('cur').removeClass('next');
        curItem = nextItem;
        setNextItem((next+1)%length);
        setTimer();
    }

    function setNextItem(i) {
        next = i;
        nextItem = items.eq(i);
    }

    function switcherClick(e) {
        if ($(this).hasClass('cur') || nextItem.is(':animated')) {
            return;
        }
        var idx = $(this).data('idx');
        cancelTimer();
        setNextItem(idx);
        move()
    }

	function cancelTimer(){
		if(timer){
			window.clearTimeout(timer);
			timer = null;
		}
	}

    init();

});
