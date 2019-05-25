class Programmer extends Engineer{
  
  constructor(){
    super();
  }

  converter(math, system){
    let n = math.length;
    let mathResult = [];
    let item = null;
    
    for(let i = 0; i < n; i++) {
      item = math[i];

      if (item != '+' && item != '-' && item != '*' && item != '/' && item != '%') {
        
        if (item instanceof Array) {
          mathResult.push(this.converter(item, system));
        } else {
          let s = parseInt(item, system);
          mathResult.push(s);
        }

      } else {
        mathResult.push(item);
      }
    }

    return mathResult;
  }


  getResult(mathLine, system){
    let math = super.sliceExpressionIntoArray(mathLine, 0, mathLine.length);
    let res = 0;
    
    if (system != 10) {
      math = this.converter(math, system);
    }

    console.log(math);

    res = super.calculate(math);

    return +((+res).toFixed(10));
    
  }


}