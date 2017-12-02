
// Art-CMF js Library
// Ajax Submit forms
// 2013-09-20

jQuery.art = {
    
    langList : [],
            
    scrollTo: function(elem, speed){
        jQuery("html, body").animate({ scrollTop: jQuery(elem).offset().top - 30 }, speed);
    },
    
    rand: function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    createLoader: function (block){
        var id = 'art' + jQuery.art.rand(100, 1000);
        block.wrap(jQuery("<div>", {'class':'wrap-box', 'id':id}));
        block.after(jQuery("<div>",{'class':'ajax-loader', 'width':jQuery("#"+id + " img").outerWidth(), 'height':jQuery("#"+id + " img").outerHeight()}));
        return id;
    },
    
    destroyLoader: function (id){
        jQuery("#" + id).find(".ajax-loader").remove();
        jQuery("#" + id).children().unwrap();
        jQuery("#" + id).remove();
    },
    
    reloadCaptcha: function (its, path){
        var loaderIdent;
        var captchaBlock = jQuery(its).closest('form').find('.captcha_line');
        
        loaderIdent = jQuery.art.createLoader(captchaBlock.find('img'));
        jQuery.post(path,
                function(data){
                    captchaBlock.find('#captcha-id').val(data.id);
                    captchaBlock.find('img').attr('src', data.src);
                    captchaBlock.find('#captcha-input').val('');
                },
                "json")
                .always(function() {
                    jQuery.art.destroyLoader(loaderIdent);
                });
    },
            
    submitForm: function(form)
    {
        var errors = '';
        //var loaderIdent;
        
        var bSubmit = jQuery(form).find(':submit');
        //console.log(bSubmit);
        
        jQuery.ajax({
            type: 'POST',
            url: form.action,
            data: jQuery(form).serialize(),
            dataType: 'json',
            beforeSend: function(xhr) { 
                bSubmit.attr("disabled", true);
                //loaderIdent = jQuery.art.createLoader(bSubmit);
            },
            success: function(data, status)
            {
                jQuery('ul.errors').remove();
                jQuery(form).find('.error').removeClass('error');
                if ('error' == data.status) {

                    //jQuery(form).children('.success_text').html('');                                        
                    //jQuery(form).children('.error_text').html(data.error_text);
                    
                    for (var key in data.error_messages)
                    {                      
                        errors = '<ul class="errors">';                       
                        for (var key_error in data.error_messages[key])
                        {
                            errors +='<li>'+data.error_messages[key][key_error]+'</li>';
                        }
                        
                        errors += '</ul>';
                        jQuery(form).find('#' + key + '-element').addClass("error").append(errors);
                    }
                } else if ('success' == data.status)
                {
                    //jQuery(form).children('.error_text').html('');
                    jQuery(form).find('.success_text').html(data.message);

                    form.reset();
                }
            },
            complete: function(xhr, textStatus) {
                bSubmit.attr("disabled", false);
                //jQuery.art.destroyLoader(loaderIdent);
            }
        });

        return false;
    }
    
};


////ArtCmf Library
//2012-11-08
	
jQuery.cmf = {
	  
    langList : [],

    reviewDown: function (){
        //jQuery('.simple_form').find('.block').slideDown(300);

        jQuery('.simple_form .pad_btn span').hide();
        jQuery('.simple_form .pad_btn span').closest('.simple_form').find('.block').slideDown(300);
        jQuery('.simple_form .pad_btn span').parent().children('.close').show();
    },

    showPopupContainer: function (id)
    {
        jQuery.modal.close();
        window.setTimeout(function () {
            jQuery('#'+id).show().modal({
                closeClass: "modalClose",            
                overlayClose:true,
                overlayCss: {
                    backgroundColor:"#000"
                },
                onOpen: function (dialog) {
                    dialog.overlay.fadeIn('fast', function () {
                        dialog.container.slideDown('fast', function () {
                            dialog.data.fadeIn('fast');
                        });
                    });                
                },
                onClose: function (dialog) {
                    jQuery.modal.close(); // must call this!
                    jQuery('#'+id).hide();
                }
            })
        }, 110);
    },


    showCart: function ()
    {
        jQuery.get('/shop/cart/view/', function(data) {
            jQuery('#cart_container_body').html(data);                 
        });
        
        var id = "basket_window";

        jQuery.modal.close();
        window.setTimeout(function () {
            jQuery('#'+id).show().modal({
                closeClass: "modalClose",
                overlayClose:true,
                position: [150, null],
                overlayCss: {
                    backgroundColor:"#000"
                },
                onOpen: function (dialog) {           
                    dialog.overlay.fadeIn('fast', function () {
                        dialog.container.slideDown('fast', function () {
                            dialog.data.fadeIn('fast');
                        });
                    });
                },
                onClose: function (dialog) {
                    jQuery('#cart_container_body').html('');
                    jQuery.modal.close(); // must call this!
                    jQuery('#'+id).hide();
                }
            })
        }, 110);
    },

    addToCart: function (form)
    {
        jQuery.ajax({
            type: 'POST',
            url: form.action,
            data: jQuery(form).serialize(),
            dataType: 'json',
            beforeSend: function(xhr) { },
            success: function(data, status)
            {
                if ('error' == data.status) {               
                    jQuery('div.box_pad .error_text').html(data.error_text);
                    alert('111');
                }
                else if ('success' == data.status)
                {       
                    jQuery('#CartItemCount').html(data.itemCount);
                    jQuery('#CartItemCountTitle').html(data.itemCountTitle);                
                    jQuery('#CartSubTotal').html(data.subTotal);
                    jQuery('.add2Cart').attr('href', '/shop/cart/view/');
                    //jQuery.cmf.showCart();
                }

            },
            complete: function(xhr, textStatus) {}
        });
        return false;
    },

    updateCart: function(form)
    {
        jQuery.ajax({
            type: 'POST',
            url: form.action,
            data: jQuery(form).serialize(),
            dataType: 'json',
            beforeSend: function(xhr) { },
            success: function(data, status)
            {
                if ('error' == data.status) {               
                    jQuery('div.box_pad .error_text').html(data.error_text);
                }
                else if ('success' == data.status)
                {              
                    jQuery('#CartItemCount').html(data.itemCount);
                    jQuery('#CartItemCountTitle').html(data.itemCountTitle);                
                    jQuery('#CartSubTotal').html(data.subTotal);
                    //jQuery.cmf.showCart();
                }

            },
            complete: function(xhr, textStatus) {}
        });
        return false;
    },

    removeCartElement: function(item_id)
    {
        jQuery.ajax({
            type: 'POST',
            url: '/shop/cart/remove',
            data: {
                'item_id' : item_id
            },
            dataType: 'json',
            beforeSend: function(xhr) { },
            success: function(data, status)
            {
                if ('error' == data.status) {               
                    jQuery('div.box_pad .error_text').html(data.error_text);
                }
                else if ('success' == data.status)
                {           
                    jQuery('#CartItemCount').html(data.itemCount);
                    jQuery('#CartItemCountTitle').html(data.itemCountTitle);                
                    jQuery('#CartSubTotal').html(data.subTotal);
                
                    jQuery.cmf.showCart();
                }

            },
            complete: function(xhr, textStatus) {}
        });
        return false;
    },
    
    clearCart: function(link)
    {
        jQuery.ajax({
            type: 'GET',
            url: jQuery(link).attr('href'),
            dataType: 'json',
            beforeSend: function(xhr) { },
            success: function(data, status)
            {
                if ('error' == data.status) {               
                    jQuery('div.box_pad .error_text').html(data.error_text);
                }
                else if ('success' == data.status)
                {              
                    jQuery('#CartItemCount').html(data.itemCount);
                    jQuery('#CartItemCountTitle').html(data.itemCountTitle);                
                    jQuery('#CartSubTotal').html(data.subTotal);
                    jQuery.cmf.showCart();
                }

            },
            complete: function(xhr, textStatus) {}
        });
        return false;
    },
    
    shopSearch: function()
    {
        jQuery(document).ready(function () {
            
            jQuery( "#shop_search" ).autocomplete({
                source: "/shop/search/autocomplete/",
                minLength: 2,
                delay: 50,
                open: function(){
                    jQuery(".ui-autocomplete").append('<div class="search_results_link"><a href="/shop/search?query='+jQuery(this).val()+'">Все результаты</a></div>');
                }
            }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
                return jQuery( "<li></li>" ).data( "item.autocomplete", item )
                .append( "<a href=\"" + item.url + "\"><span class=\"search_image\">" + 
                    "<img width=\"60px\" src=\"" + item.thumbnail + 
                    "\" /></span><span class=\"search_title\">" + item.title + "</span>" +
                    "<span class=\"search_price\">" + item.price + "</span></a>")
                .appendTo(ul)
            };
        });
    },
    
    catalogSearch: function()
    {
        jQuery(document).ready(function () {
            
            jQuery( "#catalog_search" ).autocomplete({
                source: "/catalog/search/autocomplete/",
                minLength: 2,
                delay: 50,
                open: function(){
                    jQuery(".ui-autocomplete").append('<div class="search_results_link"><a href="/catalog/search?query='+jQuery(this).val()+'">Все результаты</a></div>');
                }
            }).data( "autocomplete" )._renderItem = function( ul, item ) {
                return jQuery( "<li></li>" ).data( "item.autocomplete", item )
                .append( "<a href=\"" + item.url + "\"><span class=\"search_image\">" + 
                    "<img width=\"60px\" src=\"" + item.thumbnail + 
                    "\" /></span><span class=\"search_title\">" + item.title + "</span>" +
                    "<span class=\"search_price\">" + item.price + "</span></a>")
                .appendTo(ul)
            };
        });
    },
    
    getSkypeIcon: function()
    {
        var icon_img = jQuery('#skype_icon');
        jQuery.ajax({
            type: 'GET',
            url: '/default/index/skype-icon',
            dataType: 'json',
            success: function(data, status)
            {
                if ('success' == data.status)
                {
                    icon_img.attr('src', '/layout/skype-icons/'+data.icon_img);
                }
            }
        });
      
    },
    
    addProductToCompare: function(link, url)
    {
        jQuery.ajax({
            type: 'GET',
            url: jQuery(link).attr('href'),
            dataType: 'json',
            beforeSend: function(xhr) { },
            success: function(data, status)
            {
                if ('error' == data.status) {
                    jQuery('div.box_pad .error_text').html(data.error_text);
                }
                else if ('success' == data.status)
                {
                    jQuery(link).attr('href', "" == url ? '/shop/product/compare' : url);
                    jQuery(link).attr('onclick', '');
                    jQuery(link).html(data.link_text);
                }

            },
            complete: function(xhr, textStatus) {}
        });
        return false;
    },
    
    addProductToWishlist: function(link)
    {
        jQuery.ajax({
            type: 'GET',
            url: jQuery(link).attr('href'),
            dataType: 'json',
            beforeSend: function(xhr) { },
            success: function(data, status)
            {
                if ('error' == data.status) {
                    jQuery('div.box_pad .error_text').html(data.error_text);
                }
                else if ('success' == data.status)
                {
                    jQuery(link).attr('href', '/shop/wishlist');
                    jQuery(link).attr('onclick', '');
                    jQuery(link).html(data.link_text);
                }

            },
            complete: function(xhr, textStatus) {}
        });
        return false;
    },
    
    filterPriceRange: function(price_min, price_max, price_from, price_to)
    {        
        jQuery("#filter-price-range").slider({
            range: true,
            min: price_min,
            max: price_max,
            values: [price_from, price_to],
            slide: function( event, ui ) {
                jQuery("#filter-price-from").val(ui.values[0]);
                jQuery("#filter-price-to").val(ui.values[1]);
            },
            change: function( event, ui ) {               
            // jQuery('#catalog_filter').submit();
            }
        });
        jQuery("#filter-price-from").val(jQuery("#filter-price-range").slider("values", 0));
        jQuery("#filter-price-to").val(jQuery("#filter-price-range").slider("values", 1));
    },
    
    filterPriceReset: function(price_min, price_max)
    {
        jQuery("#filter-price-from").val(price_min);
        jQuery("#filter-price-to").val(price_max);
        jQuery('#shop_filter').submit();
        return false;
    },
    
    filtersReady: function()
    {
        jQuery(document).on('change', '.filter-field', function() {           
            jQuery('#shop_filter').submit();            
        });  
        
        jQuery(document).on('click', '.filter-color-field', function() {  
            var id = jQuery(this).attr('id');
            jQuery('#'+id+'-val').val('on');            
            jQuery('#shop_filter').submit();            
        }); 
       
    },
            
    compareCategorySelectReady: function()
    {
        jQuery(document).on('change', '#compare_category_id', function() { 
            window.location.href = jQuery(this).val();                    
        });        
       
    },  
    
    sortReady: function()
    {
        jQuery(document).on('change', '.sort-field', function() {           
            jQuery('#shop_sort').submit();            
        });
       
    },
    
    switchСurrency: function(currency)
    {
        jQuery('input#currency').val(currency);
        jQuery('form#form_switch_currency').submit();
    },

    answerReview: function(review_id)
    {
        jQuery("#parent_review_id").val(review_id);
        return false;
    },

    getPageReview: function(page)
    {
        //alert("111111");
        //add after #review;
        jQuery.ajax({
            type: 'GET',
            url: "/shop/review/get-reviews-ajax/",
            data: {
                page:page,
                productId:jQuery("#product_id").val()
            },
            dataType: 'json',
            beforeSend: function(xhr) { },
            success: function(data, status)
            {
                jQuery('form#review ul.errors').remove();
                if ('error' == data.status)
                {
                    
                }
                else if ('success' == data.status)
                {
                    jQuery("#comment_list").empty();
                    jQuery("#comment_list").append(data.html);



                    jQuery('.rate1').rating({
                        fx:'half',
                        image:'/layout/rate2_pic.png',
                        width:21,
                        readOnly:true,
                        url:'rating.php'
                    });
                
                }
            //form['submit'].disabled = false;


            },
            complete: function(xhr, textStatus) {
                return false
            }
        });

        return false;
    },
    
    sendReview: function(form)
    {
        form['submit'].disabled = true;
        var errors = '';
    
        jQuery.ajax({
            type: 'POST',
            url: form.action,
            data: jQuery(form).serialize(),
            dataType: 'json',
            beforeSend: function(xhr) { },
            success: function(data, status)
            {
                if ('error' == data.status) {
                    
                    jQuery('ul.errors').remove();
                                                            
                    jQuery(form).children('.error_text').html(data.error_text);
                    
                    for (var key in data.error_messages)
                    {                      
                        errors = '<ul class="errors">';                       
                        for (var key_error in data.error_messages[key])
                        {
                            errors +='<li>'+data.error_messages[key][key_error]+'</li>';
                        }
                        
                        errors += '</ul>';
                            
                        jQuery(form).find('.element-' + key).append(errors);
                       
                    }
                }
                
                else if ('success' == data.status)
                {
                    jQuery.cmf.getPageReview(1);
                    jQuery("#review .block").html(data.message);
                }

                jQuery.post("/contact/index/captcha", { },
                    function(data){
                        jQuery('#review #captcha-id').val(data.id);
                        jQuery('#review .capcha_line img').attr('src', data.src);
                        jQuery('#review #captcha-input').val('');
                    }, "json");

                form['submit'].disabled = false;
            },
            complete: function(xhr, textStatus) {
                return false
            }
        });

        return false;
    },
    
    login: function(by) {
        by =  by || 'google';
        window.open('/user/auth/authenticate/by/' + by, 'Auth', 'height=600,width=600,status=no,toolbar=no,menubar=no,location=no, resizable=no');
    },
          
    showAgreement: function (link)
    {
        jQuery.get(jQuery(link).attr('href'), function(data) {
            jQuery('#agreement_container_body').html(data);                 
        });
        
        jQuery.modal.close();
        window.setTimeout(function () {
            jQuery('#agreement_window').show().modal({
                closeClass: "modalClose",
                overlayClose:true,
                position: [100, null],
                overlayCss: {
                    backgroundColor:"#000"
                },
                onOpen: function (dialog) {           
                    dialog.overlay.fadeIn('fast', function () {
                        dialog.container.slideDown('fast', function () {
                            dialog.data.fadeIn('fast');
                        });
                    });
                },
                onClose: function (dialog) {
                    jQuery('#agreement_container_body').html('');
                    jQuery.modal.close(); // must call this!
                    jQuery('#agreement_window').hide();
                }
            })
        }, 500);
    },

    submitForm: function(form)
    {
        var  form_errors = '';
        var  element_errors = '';
        
        jQuery.ajax({
            type: 'POST',
            url: form.action,
            data: jQuery(form).serialize(),
            dataType: 'json',
            beforeSend: function(xhr) { },
            success: function(data, status)
            {
                if ('error' == data.status) {
                    jQuery('ul.errors').remove();
                    
                    jQuery(form).children('.success_text').html('');                                        
                    jQuery(form).children('.error_text').html(data.error_text);
                    
                    form_errors = '<ul class="errors">';                     
                    for (var key in data.error)
                    {                      
                        element_errors = '<ul class="errors">';                       
                        for (var key_error in data.error[key])
                        {
                            element_errors +='<li>'+data.error[key][key_error]+'</li>';
                            form_errors +='<li>'+data.error[key][key_error]+'</li>';                            
                        }
                        
                        element_errors += '</ul>';
                            
                        jQuery(form).children('.element-' + key).append(element_errors);                       
                    }
                    form_errors += '</ul>';
                    
                    jQuery(form).prepend(form_errors);  
                    
                } else if ('success' == data.status)
                {
                    if(data.hasOwnProperty('message') && '' == data.message) {
                        jQuery(form).children('.error_text').html('');
                        jQuery(form).children('.success_text').html(data.message);
                    } else {
                        window.location.reload();
                    }
                }
            },
            complete: function(xhr, textStatus) {}
        });
        return false;
    },
    
    
    showObject: function (object_id)
    {
        jQuery.get('/location/object/view/object_id/'+object_id, function(data) {
            jQuery('#object_container_body').html(data);                 
        });
        
        jQuery.modal.close();
        window.setTimeout(function () {
            jQuery('#object_window').show().modal({
                closeClass: "modalClose",
                overlayClose:true,
                position: [100, null],
                overlayCss: {
                    backgroundColor:"#000"
                },
                onOpen: function (dialog) {           
                    dialog.overlay.fadeIn('fast', function () {
                        dialog.container.slideDown('fast', function () {
                            dialog.data.fadeIn('fast');
                        });
                    });
                },
                onClose: function (dialog) {
                    jQuery('#object_container_body').html('');
                    jQuery.modal.close(); // must call this!
                    jQuery('#object_window').hide();
                }
            })
        }, 110);
    }

}
