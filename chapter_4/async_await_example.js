
const request = require('request');

function getPageHtml(url){
	return new Promise((resolve,reject)=>{
		request(url,(err,response,body)=>{
			resolve(body)
		})
	})
}



async function main(){
	const html = await getPageHtml('http://www.example.com');
	console.log(html);
}

main();
console.log('loading...')