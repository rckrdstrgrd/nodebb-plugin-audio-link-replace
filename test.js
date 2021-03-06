"use strict";
var plugin = {
    regexPattern: /<a href=".*\/uploads\/files\/(\w*-(.*\.mp3|.*\.ogg|.*\.wav)).*>(.*)<\/a>/ig,
    embed: '<audio src="/uploads/files/$1" controls="controls" preload="none"><a href="/uploads/files/$1">$3</a></audio>'
};

plugin.parse = function (data, callback) {
    if (!data || !data.postData || !data.postData.content) {
        return callback(null, data);
    }
    if (data.postData.content.match(plugin.regexPattern)) {
        data.postData.content = data.postData.content.replace(plugin.regexPattern, plugin.embed);
    }
    callback(null,data);
};


var fs = require('fs');
fs.readFile('/Users/rickard/Desktop/test-page.html', 'utf8', function (err, text) {
    plugin.parse({ postData: { content: text } }, function (err, data) {
        console.log(data.postData.content);
    });
});
