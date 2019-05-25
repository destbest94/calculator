class Engineer extends Simple {
  
  constructor() {
		super();
  }

	sin(math) {
		return Math.sin(this.calculate(math) * Math.PI / 180);
	}

	cos(math) {
		return Math.cos(this.calculate(math) * Math.PI / 180);
	}

	sqrt(math) {
		return Math.sqrt(this.calculate(math));
	}

	abs(math) {
		return Math.abs(this.calculate(math));
	}

	log(math) {
		return Math.log(this.calculate(math));
	}

	calcFunctions(math) {
		let len = math.length;
		let mathResult = [];
		let item = null;

		for(let i = 0; i < len; i++) {
			item = math[i];

			if (item instanceof Array) {
				item = this.calculate(item);
			}

			switch(item) {
				case 'sin': mathResult.push(this.sin(math[ ++i ]));
					break;
				case 'cos': mathResult.push(this.cos(math[ ++i ]));
					break;
				case 'sqrt': mathResult.push(this.sqrt(math[ ++i ])); 
					break;
				case 'abs': mathResult.push(this.abs(math[ ++i ]));
					break;
				case 'log': mathResult.push(this.log(math[ ++i ]));
					break;
				default: mathResult.push(item);
			}
			
		}

		return mathResult;
	}

	powAndFactorial(math) {
		let len = math.length;
		let mathResult = [];
		let item = null;

		for(let i = 0; i < len; i++) {
			item = math[i];
			
			if (item instanceof Array) {
				item = this.calculate(item);
			}

			if (item == '^') {
				mathResult.push(this.calc(mathResult.pop(), item, math[ ++i ]));
			} else {
				mathResult.push(item);
			}

		}

		return mathResult;
	}

	powAndFactorial(math) {
		let len = math.length;
		let mathResult = [];
		let item = null;
		let factorial = 1;

		for(let i = 0; i < len; i++) {
			item = math[i];
			
			if (item === '^') {
				mathResult.push(this.calc(mathResult.pop(), item, math[ ++i ]));
			} else if (item === '!'){
				let n = mathResult.pop();
				
				if (n % 1 === 0 && n > 0) {
					for(let i = 2; i <= n; i++) {
						factorial *= i;
					}
					mathResult.push(factorial);
				} else {
					throw new Error("The number must be positive and greater than 0");
				}
				
			} else {
				mathResult.push(item);
			}

		}

		return mathResult;
	}

  calculate(math) {
		let getLast = null;
		let mathResult = math;
		let result = 0;

		//For example: math = [[8]]
		getLast = super.check(mathResult);
		if (getLast) return getLast;

		//sin, cos, log, sqrt, abs
		mathResult = this.calcFunctions(math);

		getLast = super.check(mathResult);
		if (getLast) return getLast;

		mathResult = this.powAndFactorial(mathResult);

		getLast = super.check(mathResult);
		if (getLast) return getLast;

		//calc "*" and "/"
		mathResult = super.multiplicationAndDivision(mathResult);


		getLast = super.check(mathResult);
		if (getLast) return getLast;

		//calc "%"
		mathResult = super.percent(mathResult);

		getLast = super.check(mathResult);
		if (getLast) return getLast;

		//calc "+" and "-"
		mathResult = super.addAndSubtract(mathResult);

		getLast = super.check(mathResult);
		if (getLast) return getLast;
		
		//add all
		mathResult.forEach(item => {
			if (item instanceof Array) {
				result += (+this.calculate(item));
			} else {
				result += (+item);
			}
		});

		return result;
	}

  getResult(mathLine) {
		let math = super.sliceExpressionIntoArray(mathLine, 0, mathLine.length);
		let res = +this.calculate(math);
    return +res.toFixed(10);
  } 

}