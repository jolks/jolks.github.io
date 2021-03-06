var isSafari = navigator.appVersion.search('Safari') != -1 && navigator.appVersion.search('Chrome') == -1 && navigator.appVersion.search('CrMo') == -1 && navigator.appVersion.search('CriOS') == -1;
var isIe = (navigator.userAgent.toLowerCase().indexOf("msie") != -1 || navigator.userAgent.toLowerCase().indexOf("trident") != -1);

var textToCopy = 'Lucidchart: Diagrams Done Right';
var htmlToCopy = '<div hiddenContent="This is a great place to put whatever you want">Lucidchart: Diagrams Done Right</div>';

var ieClipboardDiv = $('#ie-clipboard-contenteditable');
var hiddenInput = $("#hidden-input");

var userInput = "";
var hiddenInputListener = function(text) {};

var focusHiddenArea = function() {
    // In order to ensure that the browser will fire clipboard events, we always need to have something selected
    hiddenInput.val(' ');
    hiddenInput.focus().select();
};

// Focuses an element to be ready for copy/paste (used exclusively for IE)
var focusIeClipboardDiv = function() {
    ieClipboardDiv.focus();
    var range = document.createRange();
    range.selectNodeContents((ieClipboardDiv.get(0)));
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
};

// For IE, we can get/set Text or URL just as we normally would, but to get HTML, we need to let the browser perform the copy or paste
// in a contenteditable div.
var ieClipboardEvent = function(clipboardEvent) {
    var clipboardData = window.clipboardData;
    if (clipboardEvent == 'cut' || clipboardEvent == 'copy') {
        clipboardData.setData('Text', textToCopy);
        ieClipboardDiv.html(htmlToCopy);
        focusIeClipboardDiv();
        setTimeout(function() {
            focusHiddenArea();
            ieClipboardDiv.empty();
        }, 0);
    }
    if (clipboardEvent == 'paste') {
        var clipboardText = clipboardData.getData('Text');
        ieClipboardDiv.empty();
        setTimeout(function() {
            console.log('Clipboard Plain Text: ' + clipboardText);
            console.log('Clipboard HTML: ' + ieClipboardDiv.html());
            ieClipboardDiv.empty();
            focusHiddenArea();
        }, 0);
    }
};

// For every broswer except IE, we can easily get and set data on the clipboard
var standardClipboardEvent = function(clipboardEvent, event) {
    var clipboardData = event.clipboardData;
    if (clipboardEvent == 'cut' || clipboardEvent == 'copy') {
        clipboardData.setData('text/plain', textToCopy);
        clipboardData.setData('text/html', htmlToCopy);
    }
    if (clipboardEvent == 'paste') {
        console.log('Clipboard Plain Text: ' + clipboardData.getData('text/plain'));
        console.log('Clipboard HTML: ' + clipboardData.getData('text/html'));
    }
};

// For IE, the broswer will only paste HTML if a contenteditable div is selected before paste. Luckily, the browser fires 
// a before paste event which lets us switch the focuse to the appropraite element
if (isIe) {
    document.addEventListener('beforepaste', function() {
        if (hiddenInput.is(':focus')) {
            focusIeClipboardDiv();
        }
    }, true);
}

// We need the hidden input to constantly be selected in case there is a copy or paste event. It also recieves and dispatches input events
hiddenInput.on('input', function(e) {
    var value = hiddenInput.val();
    userInput += value;
    hiddenInputListener(userInput);

    // There is a bug (sometimes) with Safari and the input area can't be updated during
    // the input event, so we update the input area after the event is done being processed
    if (isSafari) {
        hiddenInput.focus();
        setTimeout(focusHiddenArea, 0);
    } else {
        focusHiddenArea();
    }
});

// Set clipboard event listeners on the document. 
['cut', 'copy', 'paste'].forEach(function(event) {
    document.addEventListener(event, function(e) {
        console.log(event);
        if (isIe) {
            ieClipboardEvent(event);
        } else {
            standardClipboardEvent(event, e);
            focusHiddenArea();
            e.preventDefault();
        }
    });
});

// Keep the hidden text area selected
$(document).mouseup(focusHiddenArea);

// We use the
// hidden input area to make sure that cut, copy, and paste events are always fired.
