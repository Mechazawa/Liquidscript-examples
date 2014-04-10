var runBrainfuck, runCode;
runBrainfuck = function(command, tapeLength) {
  var tape, tapePointer, cmdPointer, out, cmd, c;
  tape = (function() {
    var a, i;
    a = [];
    for(i = 0; i < tapeLength; i++) {
      a.push(0);
    };
    return a;
  })();
  command = (function() {
    var a, c;
    a = "";
    for(c in command) {
      if("+-<>.,[]".indexOf(command[c]) !== -1) {
        a += command[c];
      };
    };
    return a;
  })();
  tapePointer = 0;
  cmdPointer = 0;
  out = "";
  while(true) {
  if(tapePointer > tape.length || tapePointer < 0 || cmdPointer < 0 || cmdPointer > command.length - 1) {
    break;
  };
  cmd = command[cmdPointer];
  if(cmd === "+") {
    tape[tapePointer]++;
  }else if(cmd === "-") {
    tape[tapePointer]--;
  }else if(cmd === "<") {
    tapePointer--;
  }else if(cmd === ">") {
    tapePointer++;
  }else if(cmd === ".") {
    out += String.fromCharCode(tape[tapePointer]);
  }else if(cmd === ",") {
    console.log("WARNING: ',' is not implemented!");
  }else if(cmd === "[") {
    if(tape[tapePointer] === 0) {
      c = 0;
      while(1) {
      cmdPointer++;
      if(command[cmdPointer] === "[") {
        c++;
      }else if(c === 0 && command[cmdPointer] === "]") {
        break;
      }else if(command[cmdPointer] === "]") {
        c--;
      };
      };
    };
  }else if(cmd === "]") {
    if(tape[tapePointer] !== 0) {
      c = 0;
      while(1) {
      cmdPointer--;
      if(command[cmdPointer] === "]") {
        c++;
      }else if(c === 0 && command[cmdPointer] === "[") {
        break;
      }else if(command[cmdPointer] === "[") {
        c--;
      };
      };
    };
  };
  cmdPointer++;
  };
  return out;
};
runCode = function() {
  var code, out;
  code = document.getElementById("input").value;
  console.log(code);
  out = runBrainfuck(code, 10000);
  document.getElementById("output").textContent = out;
};
