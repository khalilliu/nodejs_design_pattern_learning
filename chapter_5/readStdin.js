
//非流动模式
process.stdin
	.on('readable',()=>{
		let chunk;
		//console.log(process.stdin.read())
		//chunk = process.stdin.read();
		//console.log(chunk&&chunk.toString())
		console.log('New data available');
		while ((chunk = process.stdin.read())!==null) {
			console.log(chunk);
			console.log(
				`Chunk read: (${chunk.length}) "${chunk.toString()}"`
			)
		}
	})
	.on('finish',()=>process.stdout.write('end of stream'))