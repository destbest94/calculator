var textview;
var radio1, radio2, radio3, radio4;
var select;
var system_number_btn, system_radio_btn, system_results, system_results_p;
var left_section, engineer_btn;

var number_btn_0, number_btn_1, number_btn_2, number_btn_3, number_btn_4;
var number_btn_5, number_btn_6, number_btn_7, number_btn_8, number_btn_9;
var number_btn_A, number_btn_B, number_btn_C, number_btn_D, number_btn_E, number_btn_F;



window.onload = function () {
  this.mode = 0;

  textview = document.getElementById("textview");
  
  select = document.getElementById("select");

  radio2 = document.getElementById("radio2");

  system_results = document.getElementById("system_results");
  system_results_p = document.getElementById("system_results_p");
  system_number_btn = document.getElementById("system_buttons");
  system_radio_btn = document.getElementById("system_radio_buttons");
  left_section = document.getElementById("left_section");
  engineer_btn = document.getElementById("engineers_functions");

  number_btn_0 = document.getElementById("number_btn_0");
  number_btn_1 = document.getElementById("number_btn_1");
  number_btn_2 = document.getElementById("number_btn_2");
  number_btn_3 = document.getElementById("number_btn_3");
  number_btn_4 = document.getElementById("number_btn_4");
  number_btn_5 = document.getElementById("number_btn_5");
  number_btn_6 = document.getElementById("number_btn_6");
  number_btn_7 = document.getElementById("number_btn_7");
  number_btn_8 = document.getElementById("number_btn_8");
  number_btn_9 = document.getElementById("number_btn_9");
  number_btn_A = document.getElementById("number_btn_A");
  number_btn_B = document.getElementById("number_btn_B");
  number_btn_C = document.getElementById("number_btn_C");
  number_btn_D = document.getElementById("number_btn_D");
  number_btn_E = document.getElementById("number_btn_E");
  number_btn_F = document.getElementById("number_btn_F");
}

function displaySimpleMode() {  
  this.mode = 0;
  system_results.style.display = "none";
  system_number_btn.style.display = "none";
  left_section.style.display = "none";
}

function displayEngineerMode() {
  this.mode = 1;
  system_results.style.display = "none";
  system_number_btn.style.display = "none";
  left_section.style.display = "block";
  system_radio_btn.style.display = "none";
  engineer_btn.style.display = "block"; 
}

function displayProgrammerMode() {
  this.mode = 2;
  radio2.checked = true;
  this.system = 10;
  system_results_p.innerHTML = "BIN = 0;<br>OCT = 0; DEC = 0; HEX = 0;";
  system_results.style.display = "block";
  system_number_btn.style.display = "block";
  left_section.style.display = "block";
  system_radio_btn.style.display = "block";
  engineer_btn.style.display = "none"; 
}

function onSelectChange(){
  onClearClick();
  enableDecButtons();  
  
  switch(select.value) {
    case 'simple':
      displaySimpleMode();  
    break;

    case 'engineer':
      displayEngineerMode();
    break;

    case 'programmer':
      displayProgrammerMode();
    break;
    
  }
}

function enableDecButtons() {
  number_btn_A.disabled = true;
  number_btn_B.disabled = true;
  number_btn_C.disabled = true;
  number_btn_D.disabled = true;
  number_btn_E.disabled = true;
  number_btn_F.disabled = true;
  number_btn_0.disabled = false;
  number_btn_1.disabled = false;
  number_btn_2.disabled = false;
  number_btn_3.disabled = false;
  number_btn_4.disabled = false;
  number_btn_5.disabled = false;
  number_btn_6.disabled = false;
  number_btn_7.disabled = false;
  number_btn_8.disabled = false;
  number_btn_9.disabled = false;
}

function enableHexButtons() {
  number_btn_0.disabled = false;
  number_btn_1.disabled = false;
  number_btn_2.disabled = false;
  number_btn_3.disabled = false;
  number_btn_4.disabled = false;
  number_btn_5.disabled = false;
  number_btn_6.disabled = false;
  number_btn_7.disabled = false;
  number_btn_8.disabled = false;
  number_btn_9.disabled = false;
  number_btn_A.disabled = false;
  number_btn_B.disabled = false;
  number_btn_C.disabled = false;
  number_btn_D.disabled = false;
  number_btn_E.disabled = false;
  number_btn_F.disabled = false;
}

function enableOctButtons() {
  number_btn_0.disabled = false;
  number_btn_1.disabled = false;
  number_btn_2.disabled = false;
  number_btn_3.disabled = false;
  number_btn_4.disabled = false;
  number_btn_5.disabled = false;
  number_btn_6.disabled = false;
  number_btn_7.disabled = false;
  number_btn_8.disabled = true;
  number_btn_9.disabled = true;
  number_btn_A.disabled = true;
  number_btn_B.disabled = true;
  number_btn_C.disabled = true;
  number_btn_D.disabled = true;
  number_btn_E.disabled = true;
  number_btn_F.disabled = true;
}

function enableBinButtons() {
  number_btn_0.disabled = false;
  number_btn_1.disabled = false;
  number_btn_2.disabled = true;
  number_btn_3.disabled = true;
  number_btn_4.disabled = true;
  number_btn_5.disabled = true;
  number_btn_6.disabled = true;
  number_btn_7.disabled = true;
  number_btn_8.disabled = true;
  number_btn_9.disabled = true;
  number_btn_A.disabled = true;
  number_btn_B.disabled = true;
  number_btn_C.disabled = true;
  number_btn_D.disabled = true;
  number_btn_E.disabled = true;
  number_btn_F.disabled = true;
}

function onRadioClick(radio) {
  onCalculateClick();
  let res = getFormattedLine();
  
  if (res) {
    setResultLine(parseInt(res, this.system).toString(+radio.value).toUpperCase());
  }

  this.system = +radio.value;
  
  switch(this.system) {
    case 16: enableHexButtons(); break;
    case 10: enableDecButtons(); break;
    case 8: enableOctButtons(); break;
    case 2: enableBinButtons(); break;
  }

}


function setResultLine(mathLine) {
  textview.value = mathLine;
}


function getFormattedLine() {
  let mathLine = textview.value;
  mathLine = mathLine.replace(/\s/g, ''); //delete all whitespace
  mathLine = mathLine.replace(/([%/*+-])+/g, ' $1 '); //Operation between whitespace
  mathLine = mathLine.replace(/\s+|\t+/g, ' '); //only one whitespace
  mathLine = mathLine.replace(/(\d)\s$/g, '$1'); //after number can't be whitespace
  mathLine = mathLine.replace(/([(])\s*$/g, '$1'); //after "(" can't be whitespace
  return mathLine;
}


function onNumberClick(number) {
  let mathLine = getFormattedLine();
  
  if (mathLine.match(/\)$|\!$/)) { // if after ")" press number result will be ' * number'
    onOperationClick('*');
    onNumberClick(number);
    return;
  }

  mathLine += number.toString();

  setResultLine(mathLine);
}


function onOneSubtract() {
  let mathLine = getFormattedLine();
  
  if(mathLine.match(/[/*+%\()]$/) || mathLine == '') {
    mathLine += '1 / ';
  } else {
    mathLine += ' * 1 / ';
  }

  setResultLine(mathLine);
}


function onOperationClick(operation) {
  let mathLine = getFormattedLine();

  //after "(" can't be "*", "/", "%"
  if (mathLine.match(/\($|\(([+-]\s*)$/g) && 
    (operation == '*' || operation == '/' || operation == '%')) {

    return;
  }

  //if "Operation" pressed again and again delete last
  mathLine = mathLine.replace(/(\s*[\.%/*+-]+\s*)$/g, '');
  
  if (mathLine){ //if not empty
    setResultLine(mathLine + ` ${operation} `);
  }
}


function onPointClick() {
  let mathLine = getFormattedLine();
  
  if (mathLine.match(/\.$/)) {
    mathLine = mathLine.slice(0, -1);
    setResultLine(mathLine);
    return;
  }
  //after "Operation" press point result will be 0.
  mathLine = mathLine.replace(/(\s[%/*+-]\s)$/g, "$10");
  
  //if mathLine is empty
  if (!mathLine) mathLine = '0.';
  
  //after "(" or ")" result 0.
  if (mathLine.match(/\($|\)$/)) {
    onNumberClick(0);
    onPointClick();
    return;
  }

  //if number has not "."
  if (!mathLine.match(/(\.\d*)$/)) mathLine += '.';

  setResultLine(mathLine);
}

function onClearClick() {
  setResultLine('');
}


function onBracketsClick() {
  let mathLine = getFormattedLine();
  
  //after "Operation", "(" and if mathLine is empty
  if (mathLine.match(/(\s[%/*+-]\s)$|(\()$/g) || mathLine == '') {
    mathLine += '(';
    setResultLine(mathLine);
    
    return;
  }

  //Count of "(" and ")"
  let openBrackets = mathLine.match(/\(/g) ? mathLine.match(/\(/g).length : 0;
  let closeBrackets = mathLine.match(/\)/g) ? mathLine.match(/\)/g).length : 0;

  //after "!"
  if (mathLine.match(/\!$/)) {
    if (openBrackets > closeBrackets) {
      mathLine += ')';
      setResultLine(mathLine);

    } else {
      mathLine += ' * (';
      setResultLine(mathLine);
    }

    return;
  }

  if (mathLine.match(/[A-F]$|\d$|\)$/)) {

    if (openBrackets > closeBrackets) {
      mathLine += ')';
      setResultLine(mathLine);

      return;
    } else {
      onOperationClick('*');
      onBracketsClick();
    }

  }
  
}


function onSignClick(){
  let mathLine = getFormattedLine();
  
  //get last number with sign and brackets;
  let sign = mathLine.match(/.{0,4}\d+\.*\d*\)*$/g) 
    ? mathLine.match(/.{0,4}(\d+\.)*\d*\)*$/g).join() 
    : '';

  if (sign) {
    
    if (sign[sign.length - 1] == ')') { //if last symbol is ')' result will be "sign * ( - "
      mathLine += ' * ( -';

    } else if (sign.substr(0,4) == '( - ') { //if "sign" starts with "( - ", delete "( - ";
      mathLine = mathLine.replace(/.{0,4}(\d+\.*\d*\)*)$/g, '$1');

    } else { //else add "( - "
      mathLine = mathLine.replace(/(\d+\.*\d*\)*)$/g, '( - $1');
    }

  } else { //if "sign" is empty
    mathLine += '( - ';
  }

  setResultLine(mathLine);
}


function onFunctionsClick(arg) {
  let mathLine = getFormattedLine();
  
  if (mathLine.match(/\d$|\)$|!$/)) {
    mathLine += ` * ${ arg }(`;
  } else {
    mathLine += (arg + '(');
  }

  setResultLine(mathLine);
}


function onPowClick(arg) {
  let mathLine = getFormattedLine();
  
  if (mathLine.match(/\d$|\)$/)) {
    mathLine += `${ arg }`;
  } else {

    return;
  }

  setResultLine(mathLine);
}



function onCalculateClick() {
  let mathLine = getFormattedLine();
  mathLine = mathLine.replace(/\s/g, '');

  if (mathLine == '') return;

  let openBrackets = mathLine.match(/\(/g) ? mathLine.match(/\(/g).length : 0;
  let closeBrackets = mathLine.match(/\)/g) ? mathLine.match(/\)/g).length : 0;
  
  if (openBrackets != closeBrackets) {
    alert("Количество скобок не равно");
    
    return;
  }
  
  if (mode == 0) {
    let simple = new Simple();
    setResultLine(simple.getResult(mathLine));

    return;
  }

  if (mode == 1) {
    let engineer = new Engineer();
    setResultLine(engineer.getResult(mathLine));

    return;
  }

  if (mode == 2) {
    let programmer = new Programmer();
    let res = programmer.getResult(mathLine, this.system);
    

    let sys_res = ('BIN = ' + (+res).toString(2) + ';<br>');
    sys_res += ('OCT = ' + (+res).toString(8) + ';\t');
    sys_res += ('DEC = ' + (+res).toString(10) + ';\t');
    sys_res += ('HEX = ' + (+res).toString(16).toUpperCase() + ';\t');

    system_results_p.innerHTML = sys_res;
    
    if (system != 10) {
      setResultLine(res.toString(system).toUpperCase());
    } else {
      setResultLine(res);
    }
    
  }

}
