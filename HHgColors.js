var HHgColorRGBA = function(props){
	var temp, that = this;

this.A;
this.R;
this.G;
this.B;

	this.setRGBA = function(props){
		props = HHg.returnColorProps(props);

		if(props.R !== undefined){
			this.R = props.R
		}else if(this.R !== undefined){

		}else{
			this.R = 255;
		}
		if(props.G !== undefined){
			this.G = props.G
		}else if(this.G !== undefined){

		}else{
			this.G = 255;
		}

		if(props.B !== undefined){
			this.B = props.B
		}else if(this.B !== undefined){

		}else{
			this.B = 255;
		}

		if(props.A !== undefined){
			this.A = props.A
		}else if(this.A !== undefined){

		}else{
			this.A = 1.0;
		}

	};


		if(arguments.length > 1){

			this.R = arguments[0];
			this.G = arguments[1];
			this.B = arguments[2];
			arguments[3] !== undefined ? this.A = arguments[3] : this.A = 1.0;


		}else{

			this.setRGBA(props);

		}

	this.lighten = function(percent){
		this.R*=percent; this.G*=percent; this.B*=percent;
	}
	this.darken = function(percent){
		if(percent < 0){
			percent = 1 + percent;
		}
		this.R*=percent; this.G*=percent; this.B*=percent;
	}

	this.blendColorIn = function(color, percent){
		this.setRGBA( HHgColorHelper.blendRGBAColors(this, color, percent));
	};

	this.setToHexString = function(hex){
		this.setRGBA(HHgColorHelper.getRGBfromHex(hex));

	};

	this.getHexString = function(){
		return HHgColorHelper.getHexFromRGB(this);
	};

	this.returnSimpleObject = function(){
		return {R: this.R, G: this.G, B: this.B, A: this.A};
	};


	this.returnCopy = function(){
		return new HHgColor({R: this.R, G: this.G,B: this.B,A: this.A});
	};
	this.returnString = function(){
		return "rgba(" + this.R + "," + this.G + "," + this.B + "," + this.A +")";
	};
	this.pretty = function(){
		return this.returnString();
	};
};

var HHgColorHSLA = function(props){
	var temp;

	this.H;
	this.S;
	this.L;
	this.A;


	this.setHSLA = function(props){
			props = HHg.returnColorProps(props);

		if(props.H !== undefined){
			this.H = props.H
		}else if(this.H !== undefined){

		}else{
			this.H = 360;
		}
		if(props.S !== undefined){
			this.S = props.G
		}else if(this.S !== undefined){

		}else{
			this.S = 100;
		}

		if(props.L !== undefined){
			this.L = props.L
		}else if(this.B !== undefined){

		}else{
			this.L = 100;
		}

		if(props.A !== undefined){
			this.A = props.A
		}else if(this.A !== undefined){

		}else{
			this.A = 1.0;
		}

	};

		if(arguments.length > 1){

			this.H = arguments[0];
			this.S = arguments[1];
			this.L = arguments[2];
			arguments[3] !== undefined ? this.A = arguments[3] : this.A = 1.0;

		}else{

			this.setHSLA(props);

		};


	this.lighten = function(percent){
		this.L*=percent;
	}
	this.darken = function(percent){
		if(percent < 0){
			percent = 1 + percent;
		}
		this.L*=percent;
	}

	this.blendColorIn = function(color, percent){
		this.setHSLA(HHgColorHelper.blendHSLAColors(this,color,percent));
	};

	this.setToHexString = function(hex){
		this.setHSLA(HHgColorHelper.getHSLfromHex(hex));

	};

	this.getHexString = function(){
		return HHgColorHelper.getHexFromRGB(this);
	};

	this.returnSimpleObject = function(){
		return {H: this.H, S: this.S, L: this.L, A: this.A};
	};


	this.returnCopy = function(){
		return new HHgColor({H: this.H, S: this.S,L: this.L,A: this.A});
	};
	this.returnString = function(){
		return "hsla(" + this.H + ", " + (100 * this.S) + "%, " + (100 * this.L) + "%, " + this.A +")";
	};
	this.pretty = function(){
		return this.returnString();
	};

};

var HHgColorHelper = {};

(function() {

	var H,S,L,A,R,G,B,val1,val2, hex, hex1, hex2, hex3,max,min;

	var that = HHgColorHelper;

	that.getRGBfromHSL = function(h,s,l,a){
		if(arguments.length === 1 || h instanceof HHgColorHSLA === true){
			h = h.H; s = h.S; l = h.L; a = h.A;
		}

		h = (h > 360) ? 360 : h; h = (h < 0) ? 0 : h;
		s = (s > 1.0) ? 1.0 : s; s = (s < 0) ? 0 : s;
		l = (l > 1.0) ? 1.0 : l; l = (l < 0) ? 0 : l;

	    if(s == 0){
	        R = G = B = l;
	    }else{
	        function convertHtoRGB(p, q, t){
	            if(t < 0) t += 1;
	            if(t > 1) t -= 1;
	            if(t < 1/6) return p + (q - p) * 6 * t;
	            if(t < 1/2) return q;
	            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	            return p;
	        }

	        val1 = (l < 0.5) ? l * (1 + s) : l + s - l * s;
	        val2 = 2 * l - val1;
	        R = convertHtoRGB(val2, val1, h + 1/3) * 255;
	        G = convertHtoRGB(val2, val1, h) * 255;
	        B = convertHtoRGB(val2, val1, h - 1/3) * 255;
	    }

	    if(a === undefined){
	    	a = 1;
	    }

	    return new HHgColorRGBA(R, G, B, a);
	};

	that.getHSLfromRGB = function(r, g, b, a){
		if(arguments.length === 1 || r instanceof HHgColorRGBA === true){
			r = r.R; g = r.G; b = r.B; a = r.A;
		}


		r = (r > 255) ? 255 : r; r = (r < 0) ? 0 : r;
		g = (g > 255) ? 255 : g; g = (g < 0) ? 0 : g;
		b = (b > 255) ? 255 : b; b = (b < 0) ? 0 : b;

	    r /= 255; g /= 255; b /= 255;

	    max = Math.max(r, g, b);
	    min = Math.min(r, g, b);
	    L = (max + min) / 2;

	    if(max == min){
	        H = S = 0;
	    }else{
	        val1 = max - min;
	        S = (L > 0.5) ? val1 / (2 - max - min) : val1 / (max + min);
	        switch(max){
	            case r: H = (g - b) / val1 + (g < b ? 6 : 0); break;
	            case g: H = (b - r) / val1 + 2; break;
	            case b: H = (r - g) / val1 + 4; break;
	        }
	        H /= 6;
	    }

	     if(a === undefined){
	    		a = 1;
	    	}

	    return new HHgColorHSLA(H * 360, S, L, a);
	};

	that.getHexFromHSL = function(h,s,l,a){

		return that.getHexFromRGB(that.getRGBfromHSL(h,s,l,a));

	};
	that.getHSLfromHex = function(hex){
		return that.getHSLfromRGB(that.getRGBfromHex(hex));
	};
	that.getHexFromRGB = function(r,g,b){
		if(arguments.length === 1){
			r = r.R; g = r.G; b = r.B;
		}

		r = (r > 255) ? 255 : r; r = (r < 0) ? 0 : r;
		g = (g > 255) ? 255 : g; g = (g < 0) ? 0 : g;
		b = (b > 255) ? 255 : b; b = (b < 0) ? 0 : b;

		hex1 = r.toString(16);
		hex2 = g.toString(16);
		hex3 = b.toString(16);

		return "#" + hex1 + hex2 + hex3;
	};

	that.getRGBfromHex = function(hex){
		R = hex.substring(1,3);
		G = hex.substring(3,5);
		B = hex.substring(5,7);
		A = 1;
		R = parseInt(R, 16);
		G = parseInt(G, 16);
		B = parseInt(B, 16);

		if(R > 255) R = 255;
		if(G > 255) G = 255;
		if(B > 255) B = 255;;

		return new HHgColorRGBA(R,G,B);
	};

	that.blendRGBAColors = function(col1, col2, balance){
		col1 = HHg.returnColorProps(col1);
		col2 = HHg.returnColorProps(col2);

		R = col2.R * balance + (1 - balance) * col1.R;
		G = col2.G * balance + (1 - balance) * col1.G;
		B = col2.B * balance + (1 - balance) * col1.B;
		A = col2.A * balance + (1 - balance) * col1.A;

		return new HHgColorRGBA(R,G,B,A);

	};

	that.blendHSLAColors = function(col1, col2, balance){
		col1 = HHg.returnColorProps(col1);
		col2 = HHg.returnColorProps(col2);

		H = col2.H * balance + (1 - balance) * col1.H;
		S = col2.S * balance + (1 - balance) * col1.S;
		L = col2.L * balance + (1 - balance) * col1.L;
		A = col2.A * balance + (1 - balance) * col1.A;

		return new HHgColorHSLA(H,S,L,A);

	};

	that.getGrayscaleFromRGBA = function(color){
		var av = (color.R + color.G + color.B)/3;
		return new HHgColorRGBA(av,av,av,color.A);
	};


})();


var HHgColorRGBAWhite = new HHgColorRGBA({R:255,G:255,B:255});
var HHgColorRGBABlack = new HHgColorRGBA({R:0,G:0,B:0});
var HHgColorTransparent = new HHgColorRGBA({R:255,G:255,B:255,A:0});