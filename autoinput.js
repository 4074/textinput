
/*
 * textarea自动高度插件
 * author: dengwenfeng@4399.com
 * date: 2014-08-19
 */

+ function(){
    'use strict';
    
    var AutoInput = function(element, options){
        this.options = options
        this.$element = $(element)
        
        this.init()
    }
    
    AutoInput.defaults = {
        auto: true,
        minWidth: 100,
        maxWidth: Infinity,
        fixWidth: 20
    }
    
    AutoInput.prototype.init = function(){
        this.createSelect()
        this.listen()
        
        if(this.options.auto) this.$element.trigger('init.autoinput');
    }
    
    AutoInput.prototype.createSelect = function(){
        
        this.$select = $('<div class="form-inline" style="position:absolute;height:0;overflow:hidden;"><select class="form-control input-sm"><option></option></select><div>').insertAfter(this.$element).find('select')
        
    }
    
    AutoInput.prototype.listen = function(){
        
        var self = this
        this.$element.on('keyup input init.autoinput', function(event){
            
            self.$select.find('option').text(self.$element.val())
            var width = self.$select.width()
            width -= self.options.fixWidth
            
            if(width > self.options.minWidth){
                width = width < self.options.maxWidth ? width : self.options.maxWidth
                self.$element.width(width).css('maxWidth', width)
            }
                
        })
    }
    
    $.fn.autoinput = function(option){
        var options = $.extend({}, AutoInput.defaults, option)
        
        return $(this).each(function(){
            $(this).data('autoinput', (new AutoInput(this, options)))
        })
    }
    
}(jQuery)