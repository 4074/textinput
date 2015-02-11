/**
 * 文本框和文本域限制字数
 * @author: dengwenfeng@4399.com
 * @date: 2015-01-31
 */

+ function($){
    var TextLength = function(element, options){
        this.$element = $(element)
        this.options = options
        
        this.init()
    }
    
    TextLength.defaults = {
        show: 'focus',
        maxlength: 200,
        renderCounter: function($counter){
            return $counter
        },
        highlightCounter: function($counter, warning){
            if(warning){
                $counter.css('color', '#d66')
            }else{
                $counter.css('color', '#a8a8a8')
            }
        },
        template: '<div class="textlength-tips" style="position:absolute;margin-top:-18px;height:12px;line-height:100%;color:#a8a8a8;"><span class="textlength-tips-count">%length%</span>/<span class="textlength-tips-length">%maxlength%</span></div>'
    }
    
    TextLength.prototype.init = function(){
        this.$element.attr('maxlength', this.options.maxlength)
        this.createCounter()
        this.listen()
        this.showCount()
    }
    
    // 创建计数器
    TextLength.prototype.createCounter = function(){
        
        var $parent = this.$element.parent()
        var $counter = $(
            this.options.template
            .replace(/%length%/, this.$element.val().length)
            .replace(/%maxlength%/, this.options.maxlength)
        )
        .css({
            right: $parent.offset().left + $parent.outerWidth() - (this.$element.offset().left + this.$element.outerWidth()) + 8
        })
        
        $counter = this.options.renderCounter($counter)
        
        $parent.css('position', 'relative')
        this.$counter = $counter.insertAfter(this.$element)
        this.$count = $counter.find('.textlength-tips-count')
    }
    
    // 监听事件
    TextLength.prototype.listen = function(){
        var self = this
        this.$element.on('change.textlength input.textlength keyup.textlength', function(){
            var text = self.$element.val()
            var length = text.length
            if(length > self.options.maxlength){
                // 超过宽度 截取字符串，高亮计数器
                
                text = text.substr(0, self.options.maxlength)
                self.$element.val(text)
                self.options.highlightCounter(self.$counter, 1)
            }else if(length < self.options.maxlength){
                self.options.highlightCounter(self.$counter, 0)
            }else{
                self.options.highlightCounter(self.$counter, 1)
                
                // 等于或超过宽度，show为above时，显示计数器
                if(self.options.show == 'above'){
                    self.$counter.show()
                }
            }
            
            self.showCount(text.length)
        })
        
        if(this.options.show == 'focus' || this.options.show == 'above'){
            this.$counter.hide()
            this.$element.on('focus', function(){
                if(self.options.show == 'focus' || (self.options.show == 'above' && self.$element.val().length >= self.options.maxlength)){
                    self.$counter.show()
                }
            }).on('blur', function(){
                self.$counter.hide()
            })
        }else if(this.options.show == 'hidden'){
            this.$counter.hide()
        }else if(this.options.show == 'always'){
            
        }
    }
    
    // 显示计数值
    TextLength.prototype.showCount = function(count){
        count = count || this.$element.val().length
        this.$count.html(count)
    }
    
    // 插件定义
    $.fn.textlength = function(option){
        if(typeof option == 'number'){
            option = {
                maxlength: option
            }
        }
        var options = $.extend({}, TextLength.defaults, option)
        
        return $(this).each(function(){
            var $this = $(this)
            $this.is(':visible') && $this.data('textlength', new TextLength(this, options))
        })
    }
    
    // data api
    $('textarea[data-toggle="textlength"], input[data-toggle="textlength"]').each(function(){
        var $this = $(this)
        var maxlength = parseInt($this.attr('data-maxlength') || '')
        var show = $this.attr('data-show')
        
        var options = {}
        if(maxlength){
            options['maxlength'] = maxlength
        }
        if(show != undefined){
            options['show'] = show
        }else if(this.tagName.toLowerCase() == 'input'){
            options['show'] = 'above'
        }
        
        $this.textlength(options)
    })
    
}(jQuery)