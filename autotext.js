/*
 * textarea自动高度插件
 * author: dengwenfeng@4399.com
 * date: 2014-08-19
 */

+ function(){
    'use strict';
    
    var Autotext = function(element, options){
        this.options = options
        this.$element = $(element)
        
        this.init()
    }
    
    Autotext.defaults = {
        clear: function($el){
            // 清除name和required属性
            $el.removeAttr('name').removeAttr('required')
            return $el
        },
        auto: true,
        minHeight: 0,
        maxHeight: Infinity
    }
    
    Autotext.prototype.init = function(){
        this.options.minHeight = parseInt(this.options.minHeight) || this.$element.height()
        this.createClone()
        this.listen()
        
        this.$element.css('overflow', 'hidden')
        
        if(this.options.auto) this.$element.trigger('height.autotext');
    }
    
    Autotext.prototype.createClone = function(){
        
        var $clone = this.$element.clone().addClass('autotext-clone').css({
            visibility: 'hidden',
            height: 0,
            minHeight: 0,
            overflow: 'hidden',
            paddingTop: 0,
            paddingBottom: 0,
            border: 0
        })
        
        this.$element.nextAll('.autotext-clone').remove()
        
        $clone = this.options.clear($clone)
        $clone.insertAfter(this.$element)
        
        this.$clone = $clone
    }
    
    Autotext.prototype.listen = function(){
        
        var self = this
        
        this.$element.on('keydown.autotext input.autotext height.autotext', function(event){
            
            self.$clone.val(self.$element.val())
            
            var height
            
            if(event.keyCode == 13){
                return self.$element.trigger('height.autotext')
            }else if(event.keyCode == 8){
                return self.$element.trigger('height.autotext')
            }else{
                height = self.getHeight(self.$clone)
            }
            
            if(height > self.options.maxHeight){
                self.$element.css('overflow-y', 'scroll')
            }else{
                self.$element.css('overflow-y', 'hidden')
            }
            
            height = self.options.minHeight > height ? self.options.minHeight : height
            height = self.options.maxHeight < height ? self.options.maxHeight : height
            
            self.$element.height(height)
        })
    }
    
    Autotext.prototype.getHeight = function($el){
        
        var height
        var sheight = $el[0].scrollHeight
        var padding = parseInt($el.css('padding-top')) + parseInt($el.css('padding-bottom'))
        var lheight = parseInt($el.css('line-height'))

        height = sheight - padding

        return height
    }
    
    $.fn.autotext = function(option){
        var options = $.extend({}, Autotext.defaults, option)
        
        return $(this).each(function(){
            var $this = $(this)
            $this.is(':visible') && $this.data('autotext', new Autotext(this, options))
        })
    }
    
}(jQuery)