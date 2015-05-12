// Source: https://github.com/growaspeople/fixchar

(function() {
	"use strict";

	var fixchar = function(string) {
		return String(string)
		.replace(/\u2019/g, '\u0027') // ’ to '
		.replace(/\u201D/g, '\u0022') // ” to "
		.replace(/\u3000/g, '\u0020') // "　" (Full width space) to " " (Half width space)
		// This replaces ０-９, Ａ-Ｚ, ａ-ｚ, and ！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝～
		.replace(/[\uFF01-\uFF5E]/g, function(token) {
			return String.fromCharCode(token.charCodeAt(0) - 65248);
		});
	};

	if (typeof module !== 'undefined' && module && module.exports) {
		module.exports = fixchar;
	} else {
		window.fixchar = fixchar;
	}
}());
