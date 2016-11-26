// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// create social networking pop-ups
(function() {
	// link selector and pop-up window size
	var Config = {
		Link: "a.share-pop",
		Width: 500,
		Height: 500
	};

	// add handler links
	var slink = document.querySelectorAll(Config.Link);
	for (var a = 0; a < slink.length; a++) {
		slink[a].addEventListener('click', PopupHandler);
	}

	// create popup
	function PopupHandler(e) {
		e = (e ? e : window.event);
		var t = (e.target ? e.target : e.srcElement);

		// popup position
		var
			px = Math.floor(((screen.availWidth || 1024) - Config.Width) / 2),
			py = Math.floor(((screen.availHeight || 700) - Config.Height) / 2);

		// open popup
		var popup = window.open(t.href, "social",
			"width="+Config.Width+",height="+Config.Height+
			",left="+px+",top="+py+
			",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
		if (popup) {
			popup.focus();
			if (e.preventDefault) e.preventDefault();
			e.returnValue = false;
		}

		return !!popup;
	}

}());


(function() {
  var showOnScrollElems = document.querySelectorAll('.js-show-on-scroll');
  var shown = false;
  window.addEventListener('scroll', debounce(scrollHandler, 250));

  for (var a = 0; a < showOnScrollElems.length; a++) {
    addClass(showOnScrollElems[a], 'js-show-on-scroll--hidden');
	}

  setTimeout(function() {
    for (var a = 0; a < showOnScrollElems.length; a++) {
      addClass(showOnScrollElems[a], 'js-show-on-scroll--transition');
    }
  }, 500);

  function addClass(elem, className) {
    if (elem.classList) {
      elem.classList.add(className);
    }
    else {
      elem.className += ' ' + className;
    }
  }

  function removeClass(elem, className) {
    if (elem.classList) {
      elem.classList.remove(className);
    }
    else {
      elem.className = elem.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  function scrollHandler(e) {
    //console.log(shown, document.body.scrollTop);
    if(!shown && document.body.scrollTop > 800) {
      shown = true;
      for (var a = 0; a < showOnScrollElems.length; a++) {
        removeClass(showOnScrollElems[a], 'js-show-on-scroll--hidden');
    	}
    }
  }
}());
