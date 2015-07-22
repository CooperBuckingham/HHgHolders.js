function HHgVector2 (x,y){
  this._x = x;
  this._y = y;
  this.vBtemp;
  //this.that = this;
};

HHgVector2.prototype = Object.create(HHgVector2.prototype, {
    x: {
      get: function(){
        return this._x;
      },
      set: function(val){
        this._x = val;
      }
    },
    y: {
      get: function(){
        return this._y;
      },
      set: function(val){
        this._y = val;
      }
    },
    xy: {
      get: function(){
        return {x: this._x,y: this._y};
      },
      set: function(){
          console.log("No set for xy, use setXY()");
        }
    },
    length: {
      get: function(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
      },
      set: function(){
        console.log("NO SET METHOD for Vector Length")
      },
    }
  });

(function(){

  var p = HHgVector2.prototype;

    p.setXY = function(xy,y){
      if(xy instanceof HHgVector2 === true || typeof xy === "object"){
        this.x = xy.x;
        this.y = xy.y;
      }else if(!isNaN(y)){
        this.x = xy;
        this.y = y;
      }else{
        this.x = xy;
        this.y = xy;
      }
    };

    p.getCopy = p.copy = function(){
      return new HHgVector2(this.x, this.y);
    };

    p.getUnit = function(){
      return new HHgVector2(this.x / this.length, this.y / this.length);
    };

    p.getDistanceTo = function(vB){
      return Math.sqrt( (this.x-vB.x)*(this.x-vB.x) + (this.y-vB.y)*(this.y-vB.y) );
    };

    p.getVectorAtDistance = function(vB, dis){

      this.vBtemp = new HHgVector2(vB.x - this.x,vB.y - this.y );
      this.vBTemp = new HHgVector2(vBtemp.getUnit().x * dis, vAB.getUnit().y * dis );
      return this.plus(this.vBTemp);
    };

    p.getVectorRotated = function(vB, angle){
      angle = HHg.doDegreesToRads(angle);
      return new HHgVector2( (Math.cos(angle) * (this.x - vB.x) - Math.sin(angle) * (this.y - vB.y) + vB.x),
        (Math.sin(angle) * (this.x - vB.x) + Math.cos(angle) * (this.y - vB.y) + vB.y) );
    };

    p.pretty = function(){
      return ("x: " + Math.floor(this.x * 10000)/10000 + " y: " + Math.floor(this.y * 10000)/10000);
    };

    p.plus = function(){
      this.vBtemp = this.parse(arguments);
      return new HHgVector2(this.x + this.vBtemp.x, this.y + this.vBtemp.y);
    };

    p.plusEquals = function(){
      this.vBtemp = this.parse(arguments);
      this.setXY(this.x + this.vBtemp.x, this.y + this.vBtemp.y);
      return this;
    };

    p.minus = function(){
      this.vBtemp = this.parse(arguments);
      return new HHgVector2( this.x - this.vBtemp.x, this.y - this.vBtemp.y );
    };

    p.minusEquals = function(){
      this.vBtemp = this.parse(arguments);
      this.setXY(this.x - this.vBtemp.x, this.y - this.vBtemp.y);
      return this;
    };

    p.times = function(){
      this.vBtemp = this.parse(arguments);
      return new HHgVector2(this.x * this.vBtemp.x, this.y * this.vBtemp.y);
    };

    p.timesEquals = function(){
      this.vBtemp = this.parse(arguments);
      this.setXY(this.x * this.vBtemp.x, this.y * this.vBtemp.y);
      return this;
    };

    p.dividedBy = p.divide = p.timesInverse = function(){
      this.vBtemp = this.parse(arguments);
      return new HHgVector2(this.x / this.vBtemp.x, this.y / this.vBtemp.y);
    };

    p.dividedEquals = p.timesInverseEquals = function(){
      this.vBtemp = this.parse(arguments);
      this.setXY(this.x / this.vBtemp.x, this.y / this.vBtemp.y);
      return this;
    };

    p.subtractedFrom = function(){
      this.vBtemp = this.parse(arguments);
      return new HHgVector2(this.vBtemp.x - this.x, this.vBtemp.y - this.y);
    };

    p.isEqual = function(){
      this.vBtemp = this.parse(arguments);
      return this.x === this.vBtemp.x && this.y === this.vBtemp.y;
    };

    p.parse = function(arg){

      if(arg[0] instanceof HHgVector2 === false){
        if(arg[1] !== undefined){
          return new HHgVector2(arg[0], arg[1])
        }else{
          return new HHgVector2(arg[0], arg[0])
        }
      }else{
        return arg[0];
      }
    };

    p.zeroFloor = function(){
      if(this._x < 0) this._x = 0;
      if(this._y < 0) this._y = 0;
    };

}());




