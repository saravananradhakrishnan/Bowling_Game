!function(t){"use strict";t.fn.simplePopup=function(n){function e(){return t(document).on("click.simplePopup",I,function(n){n.preventDefault(),y=t(this),o(),g=i(),v=r(),a()}),w}function o(){if("auto"!==C.type&&"data"!==C.type&&"html"!==C.type)throw new Error('simplePopup: Type must me "auto", "data" or "html"');if(C.backdrop>1||C.backdrop<0)throw new Error('simplePopup: Please enter a "backdrop" value <= 1 of >= 0');if(C.fadeInDuration<0||Number(C.fadeInDuration)!==C.fadeInDuration)throw new Error('simplePopup: Please enter a "fadeInDuration" number >= 0');if(C.fadeOutDuration<0||Number(C.fadeOutDuration)!==C.fadeOutDuration)throw new Error('simplePopup: Please enter a "fadeOutDuration" number >= 0')}function i(){if("html"===C.type)return"html";if("data"===C.type)return"data";if("auto"===C.type){if(y.data("content"))return"data";if(t(C.htmlSelector).length)return"html";throw new Error('simplePopup: could not determine type for "type: auto"')}return!1}function r(){if("html"===g){if(!C.htmlSelector)throw new Error('simplePopup: for "type: html" the "htmlSelector" option must point to your popup html');if(!t(C.htmlSelector).length)throw new Error('simplePopup: the "htmlSelector": "'+C.htmlSelector+'" was not found');return t(C.htmlSelector).html()}if("data"===g){if(!(v=y.data("content")))throw new Error('simplePopup: for "type: data" the "data-content" attribute can not be empty');return v}return!1}function a(){C.backdrop&&l(),C.escapeKey&&m(),p()}function p(){var n=t("<div/>",{"class":"simple-popup-content",html:v}),e=t("<div/>",{id:"simple-popup","class":"hide-it"});if(C.inlineCss&&(n.css("width",C.width),n.css("height",C.height),n.css("background",C.background)),u(e),C.closeCross){var o=t("<div/>",{"class":"close"});c(o),n.append(o)}e.append(n),C.beforeOpen(e),t("body").append(e),setTimeout(function(){var n=t("#simple-popup");C.inlineCss&&(n=b(n,C.fadeInTimingFunction),n=k(n,C.fadeInDuration)),n.removeClass("hide-it")});var i=setInterval(function(){"1"===t("#simple-popup").css("opacity")&&(clearInterval(i),C.afterOpen(e))},100)}function s(){var n=t("#simple-popup");C.beforeClose(n),C.inlineCss&&(n=b(n,C.fadeOutTimingFunction),n=k(n,C.fadeOutDuration)),t("#simple-popup").addClass("hide-it");var e=setInterval(function(){"0"===t("#simple-popup").css("opacity")&&(t("#simple-popup").remove(),clearInterval(e),C.afterClose())},100);C.backdrop&&d(),C.escapeKey&&h()}function u(n){t(n).on("click",function(n){"simple-popup"===t(n.target).prop("id")&&s()})}function c(n){t(n).on("click",function(){s()})}function l(){f()}function d(){var n=t("#simple-popup-backdrop");C.inlineCss&&(n=b(n,C.fadeOutTimingFunction),n=k(n,C.fadeOutDuration)),n.addClass("hide-it");var e=setInterval(function(){"0"===t("#simple-popup-backdrop").css("opacity")&&(t("#simple-popup-backdrop").remove(),clearInterval(e))},100)}function f(){var n=t("<div/>",{"class":"simple-popup-backdrop-content"}),e=t("<div/>",{id:"simple-popup-backdrop","class":"hide-it"});C.inlineCss&&(n.css("opacity",C.backdrop),n.css("background",C.backdropBackground)),e.append(n),t("body").append(e),setTimeout(function(){var n=t("#simple-popup-backdrop");C.inlineCss&&(n=b(n,C.fadeInTimingFunction),n=k(n,C.fadeInDuration)),n.removeClass("hide-it")})}function m(){t(document).on("keyup.escapeKey",function(t){27===t.keyCode&&s()})}function h(){t(document).unbind("keyup.escapeKey")}function b(t,n){return t.css("-webkit-transition-timing-function",n),t.css("-moz-transition-timing-function",n),t.css("-ms-transition-timing-function",n),t.css("-o-transition-timing-function",n),t.css("transition-timing-function",n),t}function k(t,n){return t.css("-webkit-transition-duration",n+"s"),t.css("-moz-transition-duration",n+"s"),t.css("-ms-transition-duration",n+"s"),t.css("-o-transition-duration",n+"s"),t.css("transition-duration",n+"s"),t}var y,v,g,w=this,C=t.extend({type:"auto",htmlSelector:null,width:"600px",height:"auto",background:"#fff",backdrop:.7,backdropBackground:"#000",inlineCss:!0,escapeKey:!0,closeCross:!0,fadeInDuration:.3,fadeInTimingFunction:"ease",fadeOutDuration:.3,fadeOutimingFunction:"ease",beforeOpen:function(){},afterOpen:function(){},beforeClose:function(){},afterClose:function(){}},n),I=this.selector;return e()}}(jQuery);