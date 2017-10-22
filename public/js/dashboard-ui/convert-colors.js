//Dashboard Colors

var CovertColors = {
	color: '',
	hexDigits: ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],
	
	rgb2hex: function(rgb) {
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		return "#" + this.hex(rgb[1]) + this.hex(rgb[2]) + this.hex(rgb[3]);
	},

	hex: function(x) {
	  return isNaN(x) ? "00" : this.hexDigits[(x - x % 16) / 16] + this.hexDigits[x % 16];
	}

	/* TODO: public member "color"
	 * create is color, is rgb, is rgba, is hex methods
	 * create "to" methods
	 */
}