var fs = require('fs'),
    markdown = require('github-flavored-markdown').parse;
	
function countdown(num) {
	var left = num;
	return function() {
		left--;
		if(left <= 0) {
			return true;
		} else {
			return false;
		}
	};
}

function toKeys(arr) {
	var out = {};
	arr.forEach(function(key) {
		out[key] = "";
	});
	return out;
}

module.exports = function(files, callback) {
	var finished = countdown(files.length),
		out = toKeys(files);

	files.forEach(function(file) {
		fs.readFile(file, "utf8", function(err, contents) {
			var ret = [],
				md;

			out[file] = markdown(contents);
			if(finished()) {
				for(md in out) {
					ret.push(out[md]);
				}
				
				callback(null, ret.join("\n\n"));
			}
		});
	});	
};
