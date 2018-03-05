const util = require('util');
const ConfigTemplate = require('./configTemplate');

class JsonConfig extends ConfigTemplate{
	_serialize(data){
		return JSON.stringify(data,null,' ')
	}

	_deserialize(data){
		return JSON.parse(data)
	}

}

module.exports = JsonConfig;