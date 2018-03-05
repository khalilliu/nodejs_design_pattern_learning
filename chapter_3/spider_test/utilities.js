const urlParse = require('url').parse;
const urlResolve = require('url').resolve;
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const slug = require('slug');

module.exports.urlToFilename = function urlToFilename(url){
	const parseUrl = urlParse(url);
	const urlPath = parseUrl.path.split('/')
		.filter(component => component !== '')
		.map(component => slug(component))
		.join('/');  // '/baz/foo' => 'baz/foo'

	let filename = path.join(parseUrl.hostname, urlPath);
	if(!path.extname(filename).match(/htm/)){
		filename += '.html';
	}
	return filename
}

module.exports.getLinkUrl = function getLinkUrl(currentUrl, element){
	const link = urlResolve(currentUrl, element.arrtibs.href||'');
	const parsedLink = urlParse(link);
	const currentParsedUrl = urlParse(currentUrl);
	if(parsedLink.hostname !== currentParsedUrl.hostname || !parsedLink.pathname){
		return null;
	}
	return link; 
}

module.exports.getPageLinks = function getPageLinks(currentUrl, body){
	return [].slice.call(cheerio.load(body)('a'))
		.map(element => module.exports.getLinkUrl(currentUrl, element))
		.filter(element => !!element)
}