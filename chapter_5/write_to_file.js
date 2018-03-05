const ToFileStream = require('./to_file_stream');
const tfs = new ToFileStream();

tfs.write({path:'files/file1.txt',content:'hello'});
tfs.end(()=>console.log('All file created'));