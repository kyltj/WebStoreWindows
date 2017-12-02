/* Copyright (C) YOOtheme GmbH, YOOtheme Proprietary Use License (http://www.yootheme.com/license) */

(function($){

	$(document).bind('ready', function() {

		/* Accordion menu */
		$('.menu-accordion').accordionMenu({ mode:'slide' });

		/* Dropdown menu */
		$('#menu').dropdownMenu({ mode: 'diagonal', dropdownSelector: 'div.dropdown' }).dropdownMenu("matchUlHeight");

		/* Smoothscroll */
		$('a[href="#page"]').smoothScroller({ duration: 500 });

		/* Match height of div tags */
		$('div.headerbox div.deepest').matchHeight(20);
		$('div.topbox div.deepest').matchHeight(20);
		$('div.bottombox div.deepest').matchHeight(20);
		$('div.maintopbox div.deepest').matchHeight(20);
		$('div.mainbottombox div.deepest').matchHeight(20);
		$('div.contenttopbox div.deepest').matchHeight(20);
		$('div.contentbottombox div.deepest').matchHeight(20);
		
		/*$('#slideshow').rhinoslider({
		    effect: 'kick',
		    controlsPlayPause: false
		});*/
		

	});
       
})(jQuery);
jQuery(document).ready(function() {

		// Hide text after contact form
		jQuery("#middle-expand").contents().filter(function(){
		   return (this.nodeType == 3);
		}).remove();

		// jQuery(".flexnav").flexNav({
		//   'animationSpeed':     250,            // default for drop down animation speed
		//   'transitionOpacity':  true,           // default for opacity animation
		//   'buttonSelector':     '.menu-button', // default menu button class name
		//   'hoverIntent':        false,          // Change to true for use with hoverIntent plugin
		//   'hoverIntentTimeout': 150,            // hoverIntent default timeout
		//   'calcItemWidths':     false,          // dynamically calcs top level nav item widths
		//   'hover':              true            // would you like hover support?      
		// });

		jQuery('.slimmenu').slimmenu(
		{
		    resizeWidth: '767', /* Navigation menu will be collapsed when document width is below this size or equal to it. */
		    initiallyVisible: false, /* Make main navigation menu initially visible on mobile devices without the need to click on expand/collapse icon. */
		    collapserTitle: 'Меню', /* Collapsed menu title. */
		    animSpeed: 'medium', /* Speed of the sub menu expand and collapse animation. */
		    easingEffect: null, /* Easing effect that will be used when expanding and collapsing menu and sub menus. */
		    indentChildren: false, /* Indentation option for the responsive collapsed sub menus. If set to true, all sub menus will be indented with the value of the option below. */
		    childrenIndenter: '&nbsp;', /* Responsive sub menus will be indented with this character according to their level. */
		    expandIcon: '<i>&#9660;</i>', /* An icon to be displayed next to parent menu of collapsed sub menus. */
		    collapseIcon: '<i>&#9650;</i>' /* An icon to be displayed next to parent menu of expanded sub menus. */
		});

    jQuery('#slider').rhinoslider({
        controlsPlayPause: false,
        showCaptions: 'always',
        changeBullets: 'before'
    });

    // Add scecific class for slider container to hide it in mobile
    jQuery('#slider').closest('.topbox').addClass('slider-wrapper');

    // Add comments
    if(jQuery('#feedback_ru').length) {
    	jQuery.getJSON('/js/comments/comments_ru.json', function(data) {
	    	var comments = [];
	    	jQuery.each( data, function( i, comment ) {
			    comments.push( 
			    	'<div class="comment-wrap">' 
			    	+ '<div class="photo"><div class="avatar" style="background-image: url(/js/comments/images/' + comment.authorImage + ')"></div></div>'
			    	+ '<div class="comment-block"><p class="comment-text">' + comment.text + '</p>'
			    	+ '<div class="bottom-comment"><p>' + comment.author + '</p>'
			    	+ '<img class="company-logo" src="/js/comments/images/' + comment.logo + '" />'
			    	+ '<p>' + comment.date + '</p></div>'
			    	+ '</div>'
			    	+ '</div>' 
			    	);
			  });
	    	jQuery( "<div/>", {
			    "class": "comments",
			    html: comments.join( "" )
			  }).appendTo( "#feedback_ru" );
	    })
    } else if (jQuery('#feedback_uk').length) {
    	jQuery.getJSON('/js/comments/comments_uk.json', function(data) {
	    	var comments = [];
	    	jQuery.each( data, function( i, comment ) {
			    comments.push( 
			    	'<div class="comment-wrap">' 
			    	+ '<div class="photo"><div class="avatar" style="background-image: url(/js/comments/images/' + comment.authorImage + ')"></div></div>'
			    	+ '<div class="comment-block"><p class="comment-text">' + comment.text + '</p>'
			    	+ '<div class="bottom-comment"><p>' + comment.author + '</p>'
			    	+ '<img class="company-logo" src="/js/comments/images/' + comment.logo + '" />'
			    	+ '<p>' + comment.date + '</p></div>'
			    	+ '</div>'
			    	+ '</div>' 
			    	);
			  });
	    	jQuery( "<div/>", {
			    "class": "comments",
			    html: comments.join( "" )
			  }).appendTo( "#feedback_uk" );
	    })
    } else if(jQuery('#feedback_ru--home').length) {
    	jQuery.getJSON('/js/comments/comments_ru.json', function(data) {
	    	var comments = [];
	    	jQuery.each( data, function( i, comment ) {
	    		if(comment.displayOnHomepage === 'true') {
				    comments.push( 
				    	'<div class="comment-wrap">' 
				    	+ '<div class="photo"><div class="avatar" style="background-image: url(/js/comments/images/' + comment.authorImage + ')"></div></div>'
				    	+ '<div class="comment-block"><p class="comment-text">' + comment.text + '</p>'
				    	+ '<div class="bottom-comment"><p>' + comment.author + '</p>'
			    		+ '<img class="company-logo" src="/js/comments/images/' + comment.logo + '" />'
			    		+ '<p>' + comment.date + '</p></div>'
				    	+ '</div>'
				    	+ '</div>' 
				    	);
				  }
			  });
	    	jQuery( "<div/>", {
			    "class": "comments",
			    html: comments.join( "" )
			  }).appendTo( "#feedback_ru--home" );
	    })
    } else if (jQuery('#feedback_uk--home').length) {
    	jQuery.getJSON('/js/comments/comments_uk.json', function(data) {
	    	var comments = [];
	    	jQuery.each( data, function( i, comment ) {
	    		console.log(comment)
			    if(comment.displayOnHomepage === 'true') {
			    	var coma = (comment.author.length > 0 && comment.company.length > 0) ? ', ' : '';
				    comments.push( 
				    	'<div class="comment-wrap">' 
				    	+ '<div class="photo"><div class="avatar" style="background-image: url(/js/comments/images/' + comment.authorImage + ')"></div></div>'
				    	+ '<div class="comment-block"><p class="comment-text">' + comment.text + '</p>'
				    	+ '<div class="bottom-comment"><p>' + comment.author + '</p>'
				    	+ '<img class="company-logo" src="/js/comments/images/' + comment.logo + '" />'
				    	+ '<p>' + comment.date + '</p></div>'
				    	+ '</div>'
				    	+ '</div>' 
				    	);
				  }
			  });
	    	jQuery( "<div/>", {
			    "class": "comments",
			    html: comments.join( "" )
			  }).appendTo( "#feedback_uk--home" );
	    })
    }
    

});
