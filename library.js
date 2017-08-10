"use strict";
var plugin = {
    regexPattern: /<a href=".*\/uploads\/files\/(\w*-(.*\.mp3|.*\.ogg|.*\.wav)).*>(.*)<\/a>/ig,
    embed: '<br>$3<br><audio src="/uploads/files/$1" controls="controls" preload="none"><a href="/uploads/files/$1">$3</a></audio>'
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

module.exports = plugin;