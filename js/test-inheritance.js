var Parent = function (parameters) {

	if( typeof parameters == "undefined" ) {
		parameters = {};
	}	

	this.size = 5;

	if( typeof parameters.size != "undefined" ) {
		this.size = parseInt(parameters.size);
	}

	this.name = "Generic Parent";

	if( typeof parameters.name != "undefined" ) {
		this.name = parameters.name;
	}

}

Parent.prototype.toString = function () {
	if( typeof this.toStringer != "undefined" ) 
		return this.toStringer();

	return this.name+' : '+this.size;
}

var Child = function (parameters) {
	
}

Child.prototype = new Parent();
Child.prototype.constructor = Parent;

Child.prototype.toStringer = function() {
	return this.name.toUpperCase()+" : "+this.size;
}

