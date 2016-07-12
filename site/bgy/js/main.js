$(document).ready(function(){
	var scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
		scrollItem = $('.scroll-h b'),
		w = scrollItem.width();
		timeout = null,
		left = scrollWidth,
		step = 3,
		duration = 50;

	function move () {
		left -= step;
		if (left <= -1*w) {
			left = scrollWidth;
		}
		scrollItem.css('left', left + 'px');

		setTimeout(move, duration);
	}

	setTimeout(move, duration);

});
