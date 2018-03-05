function* iteratorGenerator(arr){
	for(let i=0;i<arr.length;i++){
		yield arr[i];
	}
}

const iterator = iteratorGenerator(['apple','orange','banana']);
let currentItem = iterator.next();
let print = false;