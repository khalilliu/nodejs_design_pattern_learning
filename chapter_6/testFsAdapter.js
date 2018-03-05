const levelup = require('level');
const fsAdapter = require('./fsAdapter');

const db = levelup('./fsDB',{valueEncoding: 'binary'});
const fs = fsAdapter(db);

fs.writeFile('file.txt',"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae sunt porro optio odit! Officiis reprehenderit aspernatur, voluptas rem modi! Aspernatur maiores, nemo. Quae consequuntur laborum alias in sapiente, quia veniam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae sunt porro optio odit! Officiis reprehenderit aspernatur, voluptas rem modi! Aspernatur maiores, nemo. Quae consequuntur laborum alias in sapiente, quia veniam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae sunt porro optio odit! Officiis reprehenderit aspernatur, voluptas rem modi! Aspernatur maiores, nemo. Quae consequuntur laborum alias in sapiente, quia veniam.",()=>{
	fs.readFile('file.txt',{encoding:'utf8'},(err,res)=>{
		console.log(res);
	})
})

//try to read a missing file
fs.readFile('missing.txt', {encoding: 'utf8'}, (err, res) => {
  console.log(err);
});