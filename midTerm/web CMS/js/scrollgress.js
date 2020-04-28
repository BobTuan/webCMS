/*!

                                                 Name        : Scrollgress
                                                 Dependencies: jQuery
                                                 Author      : Michael Lynch
                                          Author URL         : http       :       //michaelynch.com
                                          Date   Created     : August 20,   2014
                                          Last   Updated     : February 18, 2018
Licensed under the MIT license

*/

;(function($jq) {

	$jq.fn.scrollgress = function(options) {

		// return if no element was bound
		// so chained events can continue
		if(!this.length) {
			return this;
		}

		// define default parameters
		const defaults = {
			height  : '5px',
			color   : '#ff0000',
			el      : null,
			complete: function() {},
			success : function() {}
		}

		// define plugin
		const plugin = this;

		// define settings
		plugin.settings = {}

		// merge defaults and options
		plugin.settings = $jq.extend({}, defaults, options);

		const s               = plugin.settings;
		const el              = $jq(this);
		const elOverflow      = el.css('overflow');
		const elOverflowY     = el.css('overflow-y');
		const hasOverflow     = (elOverflow === 'auto' || elOverflow === 'scroll' || elOverflowY === 'auto' || elOverflowY === 'scroll') ? true : false;
		const windowHeight    = $jq(window).outerHeight();
		const heightToScroll  = (hasOverflow) ? el[0].scrollHeight : el.height();
		const elementToScroll = (hasOverflow) ? el : $jq(window);
		const progressBar     = '<div class="scrollgress"><div class="scrollgress__progress"></div></div>';

		let lastScrollTop = 0;
		let st;
		let amountScrolled;
		let percentScrolled;

		if(!s.el) {

			$jq('.black_overlay').prepend(progressBar);

			$jq('.scrollgress').css({
				position  : 'fixed',
				top       : '0px',
				left      : '0px',
				background: 'transparent',
				width     : '100%',
				height    : s.height
			});

			$jq('.scrollgress__progress').css({
				float     : 'left',
				background: s.color,
				width     : '0%',
				height    : s.height
			});

			// redefine scrollgress element
			s.el = '.scrollgress__progress';
		}

		elementToScroll.scroll(function(e) {

			st             = elementToScroll.scrollTop();
			amountScrolled = (hasOverflow) ? el.scrollTop() : $jq(document).scrollTop();

			// divide the amount of pixels scrolled by the total height to scroll minus the height of the window
			// and round the result to two decimal places
			percentScrolled = ((amountScrolled / (heightToScroll - windowHeight)) * 100).toFixed(2);

			$jq(s.el).css({
				width: percentScrolled + '%'
			});

			// if scrolling down and at bottom
			if($jq(window).scrollTop() + $jq(window).height() == $jq(document).height()) {

				// call complete callback
				s.complete.call(this);
			}

			// redefine last scroll top
			lastScrollTop = st;
		});

		s.success.call(this);
	}

})(jQuery);
