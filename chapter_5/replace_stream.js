"use strict";

const stream = require('stream');
const util = require('util');

class ReplaceStream extends stream.Transform{
	constructor(searchString, replaceString){
		super();
		this.searchString = searchString;
		this.replaceString = replaceString;
		this.tailPiece = '';
	}

	_transform(chunk,encoding,callback){
		const pieces = (this.tailPiece + chunk)
			.split(this.searchString);

		const lastPiece = pieces[pieces.length - 1];  //最后一个
		const tailPieceLen = this.searchString.length - 1; //搜索的长度


		//将最后一项分成 按照  ...last  +  (searchString.length-1) 两个部分
		this.tailPiece = lastPiece.slice(-tailPieceLen);  //从后面取出长度

		//最后一项变成  (totalLen - (searchString.length-1)) 
		pieces[pieces.length - 1] = lastPiece.slice(0,-tailPieceLen);  //从后面去掉长度

		this.push(pieces.join(this.replaceString));
		callback();
	}
	_flush(callback){
		//返回 最后一个元素的 (searchString.length-1)
		this.push(this.tailPiece);
		callback();
	}
}

module.exports = ReplaceStream;