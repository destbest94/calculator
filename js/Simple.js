class Simple {

	constructor() {
	}

	//sliceExpressionIntoArray
  sliceExpressionIntoArray(mathLine, start, length) {
		let res = [];
		let element = '';
		let temp = [];
		let i = start;
		while (i < length) {

			if (mathLine[i] == '(') {

				if (element) {
          
          if (element == '+' || element == '-') {
            res.push(element + '1');
					  res.push('*');
          
          } else {
            if (element.slice(0,1) == '+' || element.slice(0,1) == '-') {
              res.push(element.slice(0,1) + '1');
              res.push('*');
              res.push(element.slice(1));
            } else {
              res.push(element);
            }
            
          }

				}

				element = '';
				temp = this.sliceExpressionIntoArray(mathLine, i + 1, length);
				i = temp.pop(); // (2)
				res.push(temp);

			} else if (mathLine[i] == ')') {

				if (element) res.push(element);

				element = '';
				res.push(i); // (1)

				return res;

			} else if (mathLine[i] == '*' || mathLine[i] == '/' || mathLine[i] == '+'
				|| mathLine[i] == '-' || mathLine[i] == '%' || mathLine[i] == '^' || mathLine[i] == '!') {

				if (element) res.push(element);
				
				if (mathLine[i] == '+' || mathLine[i] == '-') {
					element = mathLine[i];
				} else {
					res.push(mathLine[i]);
					element = '';
				}

			} else {
				element += mathLine[i];
			}

			i++;
		}

		if (element) res.push(element);

		return res;

  }
	
	calc(a, operation ,b) {

		if (a instanceof Array) {
			a = this.calculate(a);
		}

		if (b instanceof Array) {
			b = this.calculate(b);
		}

		switch (operation) {
			case '*': return (+a) * (+b);
			case '/': return (+a) / (+b);

			case '%': return ((+a) * (+b)) / 100;

			case '+': return (+a) + (+b);
			case '-': return (+a) - (+b);

			case '^': return Math.pow((+a),(+b));
		}
	}


	check(math) {
		//For example: math = [[8]]

		if (math.length == 1) {
			if (math[0] instanceof Array) {
				return this.calculate(math[0]);
			} else {
				return math[0];
			}
		}

	}


	multiplicationAndDivision(math) {
		let len = math.length;
		let mathResult = [];
		let item = null;

		for(let i = 0; i < len; i++) {
			item = math[i];
			
			if (item == '*' || item == '/') {
				mathResult.push(this.calc(mathResult.pop(), item, math[ ++i ]));
			} else {
				mathResult.push(item);
			}
		}

		return mathResult;
	}
	

	percent(math) {
		let len = math.length;
		let mathResult = [];
		let item = null;

		for(let i = 0; i < len; i++) {
			item = math[i];
			
			if (item == '%') {
				mathResult.push(this.calc(mathResult.pop(), item, math[ ++i ]));
			} else {
				mathResult.push(item);
			}
		}

		return mathResult;
	}


	addAndSubtract(math) {
		let len = math.length;
		let mathResult = [];
		let item = null;

		for(let i = 0; i < len; i++) {
			item = math[i];
			
			if (item == '+' || item == '-') {
				mathResult.push(this.calc(mathResult.pop(), item, math[ ++i ]));
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
		getLast = this.check(mathResult);
		if (getLast) return getLast;

		//calc "*" and "/"
		mathResult = this.multiplicationAndDivision(mathResult);


		getLast = this.check(mathResult);
		if (getLast) return getLast;

		//calc "%"
		mathResult = this.percent(mathResult);

		getLast = this.check(mathResult);
		if (getLast) return getLast;

		//calc "+" and "-"
		mathResult = this.addAndSubtract(mathResult);

		getLast = this.check(mathResult);
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
		let result = 0;
		let len = mathLine.length;
		let math = [];

		math = this.sliceExpressionIntoArray(mathLine, 0, len);
		result = this.calculate(math);

		return result;
	}

}
