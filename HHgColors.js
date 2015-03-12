var HHgColorRGBA = function(props){
	var  A, R,G,B, temp, that = this;


	this.setRGBA = function(props){
		HHg.returnColorProps(props);

			R = props.R || R || 255;
			G = props.G || G || 255;
			B = props.B || B || 255;
			A = props.A || A || 1.0;
	};


		if(arguments.length > 1){

			R = arguments[0];
			G = arguments[1];
			B = arguments[2];
			arguments[3] ? A = arguments[3] : A = 1.0;

		}else{

			this.setRGBA(props);
			
		}



	this.setR = function(v){
		R = v;
	};
	this.setG = function(v){
		G = v;
	};
	this.setB = function(v){
		B = v;
	};
	this.setA = function(v){
		A = v;
	};

	this.getR = function(){
		return R;
	};
	this.getG = function(){
		return G;
	};
	this.getB = function(){
		return B;
	};
	this.getA = function(){
		return A;
	};

	this.blendColorIn = function(color, percent){
		HHgColorHelper.blendRGBAColors(color, this, percent);
	};

	this.setToHexString = function(hex){
		this.setRGBA(HHgColorHelper.getRGBfromHex(hex));
	
	};

	this.getHexString = function(){
		return HHgColorHelper.getHexFromRGB(this);
	};

	this.returnSimpleObject = function(){
		return {R: R, G: G, B: B, A: A};
	};
	

	this.returnCopy = function(){
		return new HHgColor({R: R, G: G,B: B,A: A});
	};
	this.returnString = function(){
		//TODO
	};
	this.pretty = function(){
		return ("R: " + R + " G: " + G + " B: " + B + " A: " + A);
	};
};

var HHgColorHSLA = function(props){
	var H, S, L, A, temp;


	this.setHSLA = function(props){
			HHg.returnColorProps(props);
			H = props.H || H || 360;
			S = props.S || S || 100;
			L = props.L || L || 100;
			A = props.A || A || 1.0;
			
	};

		if(arguments.length > 1){

			H = arguments[0];
			S = arguments[1];
			L = arguments[2];
			arguments[3] ? A = arguments[3] : A = 1.0;

		}else{

			this.setHSLA(props);
			
		};



	this.setH = function(v){
		H = v;
	};
	this.setS = function(v){
		S = v;
	};
	this.setL = function(v){
		L = v;
	};
	this.setA = function(v){
		A = v;
	};

	this.getH = function(){
		return H;
	};
	this.getS = function(){
		return S;
	};
	this.getL = function(){
		return L;
	};
	this.getA = function(){
		return A;
	};

	this.blendColorIn = function(color, percent){
		HHgColorHelper.blendHSLAColors(color,this,percent);
	};

	this.setToHexString = function(hex){
		this.setHSLA(HHgColorHelper.getHSLfromHex(hex));
		
	};

	this.getHexString = function(){
		return HHgColorHelper.getHexFromRGB(this);
	};

	this.returnSimpleObject = function(){
		return {H: H, S: S, L: L, A: A};
	};
	

	this.returnCopy = function(){
		return new HHgColor({H: H, S: S,L: L,A: A});
	};
	this.returnString = function(){
		//TODO
	};
	this.pretty = function(){
		return ("H: " + H + " S: " + L + " L: " + L + " A: " + A);
	};

};

var HHgColorHelper = function HHgColorHelper() {
	if(HHgColorHelper.singleton){
		return HHgColorHelper.singleton;
	}

	HHgColorHelper.singleton = this;

	var H,S,L,A,R,G,B,val1,val2, hex, hex1, hex2, hex3,max,min;

	this.getRGBfromHSL = function(h, s, l){
		if(arguments.length === 1){
			h = h.H; s = h.S; l = H.l;
		}

		h = h > 360 ? 360 : h; h = h < 0 ? 0 : h;
		s = s > 1.0 ? 1.0 : s; s = s < 0 ? 0 : s;
		l = l > 1.0 ? 1.0 : l; l = l < 0 ? 0 : l;

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

	        val1 = l < 0.5 ? l * (1 + s) : l + s - l * s;
	        val2 = 2 * l - val1;
	        R = convertHtoRGB(val2, val1, h + 1/3) * 255;
	        G = convertHtoRGB(val2, val1, h) * 255;
	        B = convertHtoRGB(val2, val1, h - 1/3) * 255;
	    }

	    return {R:R, G:G, B:B};
	};

	this.getHSLfromRGB = function(r, g, b){
		if(arguments.length === 1){
			r = r.R; g = r.G; b = r.B;
		}
		console.log("r"+r+" g"+g+" b"+b);

		r = r > 255 ? 255 : r; r = r < 0 ? 0 : r;
		g = g > 255 ? 255 : g; g = g < 0 ? 0 : g;
		b = b > 255 ? 255 : b; b = b < 0 ? 0 : b;
		


	    r /= 255; g /= 255; b /= 255;

	    max = Math.max(r, g, b);
	    min = Math.min(r, g, b);
	    L = (max + min) / 2;

	    if(max == min){
	        H = S = 0;
	    }else{
	        val1 = max - min;
	        S = L > 0.5 ? val1 / (2 - max - min) : val1 / (max + min);
	        switch(max){
	            case r: H = (g - b) / val1 + (g < b ? 6 : 0); break;
	            case g: H = (b - r) / val1 + 2; break;
	            case b: H = (r - g) / val1 + 4; break;
	        }
	        H /= 6;
	    }

	    return {H:H * 360,S:S,L:L};
	};

	this.getHexFromHSL = function(){
		
		return this.getHexFromRGB(this.getRGBfromHSL(arguments));

	};
	this.getHSLfromHex = function(){
		return this.getHSLfromRGB(this.getRGBfromHex());
	};
	this.getHexFromRGB = function(r,g,b){
		if(arguments.length === 1){
			r = r.R; g = r.G; b = r.B;
		}

		r = r > 255 ? 255 : r; r = r < 0 ? 0 : r;
		g = g > 255 ? 255 : g; g = g < 0 ? 0 : g;
		b = b > 255 ? 255 : b; b = b < 0 ? 0 : b;

		hex1 = r.toString(16);
		hex2 = g.toString(16);
		hex3 = b.toString(16);
		console.log("#" + hex1 + hex2 + hex3);
		return "#" + hex1 + hex2 + hex3;
	};

	this.getRGBfromHex = function(hex){
		R = hex.substring(1,3);
		G = hex.substring(3,5);
		B = hex.substring(5,7);
		A = 1;

		R = parseInt(R, 16);
		G = parseInt(G, 16);
		B = parseInt(B, 16);

		R = R > 255 ? R : 255;
		G = G > 255 ? G : 255;
		B = B > 255 ? B : 255;

		return {R:R,G:G,B:B};
	};

	this.blendRGBAColors = function(col1, col2, balance){
		col1 = HHg.returnColorProps(col1);
		col2 = HHg.returnColorProps(col2);

		R = col1.R * balance + (1 - balance) * col2.R;
		G = col1.G * balance + (1 - balance) * col2.G;
		B = col1.B * balance + (1 - balance) * col2.B;
		A = col1.A * balance + (1 - balance) * col2.A;

		return {R:R,G:G,B:B,A:A};

	};

	this.blendHSLAColors = function(col1, col2, balance){
		col1 = HHg.returnColorProps(col1);
		col2 = HHg.returnColorProps(col2);

		H = col1.H * balance + (1 - balance) * col2.H;
		S = col1.S * balance + (1 - balance) * col2.S;
		L = col1.L * balance + (1 - balance) * col2.L;
		A = col1.A * balance + (1 - balance) * col2.A;

		return {H:H,S:S,L:L,A:A};

	};

	
	return this;

}();

var startColorRGB = new HHgColorRGBA(85,128,64);
console.log(startColorRGB.pretty());

var HHgColorRGBAWhite = new HHgColorRGBA({R:255,G:255,B:255});
var HHgColorRGBABlack = new HHgColorRGBA({R:0,G:0,B:0});