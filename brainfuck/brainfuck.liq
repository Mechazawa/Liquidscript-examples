#! allow String document setTimeout Math
# A really messy brainfuck interpeter

run-brainfuck = (command, tape-length) ->{
    tape = (()->{a=[] for(i = 0, i<tape-length, i++) {a.push(0)} return a})()
    command=(()->{a="" for(c in command){if("+-<>.,[]".indexOf(command[c]) != -1){a+=command[c]}} return a})()
    tape-pointer = 0
    cmd-pointer = 0
    out = ""
    while(true) {
        if (tape-pointer > tape.length or tape-pointer < 0 or cmd-pointer < 0 or cmd-pointer > command.length - 1) {
            break
        }

        cmd = command[cmd-pointer]
        if(cmd == "+" ){tape[tape-pointer]++}
        elsif(cmd == "-"){tape[tape-pointer]--}
        elsif(cmd == "<"){tape-pointer--}
        elsif(cmd == ">"){tape-pointer++}
        elsif(cmd == "."){out += String.fromCharCode(tape[tape-pointer])}
        elsif(cmd == ","){console.log("WARNING: ',' is not implemented!")} # Not implemented
        elsif(cmd == "["){
            if(tape[tape-pointer]==0) {
                c=0 
                while(1){
                    cmd-pointer++ 
                    if(command[cmd-pointer] == "[") {c++}
                    elsif(c==0 and command[cmd-pointer] == "]"){break}
                    elsif(command[cmd-pointer] == "]"){c--}
                }
            }
        }
        elsif(cmd == "]"){
            if(tape[tape-pointer]!=0) {
                c=0 
                while(1){
                    cmd-pointer--
                    if(command[cmd-pointer] == "]") {c++}
                    elsif(c==0 and command[cmd-pointer] == "["){break}
                    elsif(command[cmd-pointer] == "["){c--}
                }
            }
        }
        cmd-pointer++
    }
    return out
}

runCode = ()->{
    code = document.getElementById("input").value
    console.log(code)
    out = run-brainfuck(code,10000)
    document.getElementById("output").textContent = out
}