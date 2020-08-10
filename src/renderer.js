
let input = document.querySelector('#input')
let result = document.querySelector('#result')
let btn = document.querySelector('#btn')
let { PythonShell } = require('python-shell');
//let pyshell = require('python-shell');
let foo = 0;

function sendToPython_dev() {
    let options = {
        mode: 'text'
    };
//    PythonShell.run('./py/server.py', options, function (err, results) {
//        if (err) throw err;
//        console.log('response: ', results);
//    }).on('message', function (message) {
//        console.log('flask', message);
//    }).on('stderror', function (message) {
//        console.log('flask error', message);
//    });
    let pyshell = new PythonShell('./py/server.py', options);
    pyshell.on('message', function (message) {
        console.log('flask', message);
    });
    console.log(pyshell.childProcess.pid);
    foo = pyshell.childProcess.pid;
}

function sendToPython_prod() {
    pyProc = require('child_process').execFile("dist/server/server")
    if (pyProc != null) {
        //console.log(pyProc)
        //console.log('child process success on port ' + port)
        console.log('child process success')
    }
}

sendToPython_dev();
//sendToPython_prod();

function onclick(){
  fetch(`http://127.0.0.1:5001/calc/${input.value}`).then((data)=>{      
      return data.text();
  }).then((text)=>{
    console.log("data: ", text);
    result.textContent = text;
  }).catch(e=>{
    console.log(e);
  })
}

btn.addEventListener('click', () => {
  onclick();
});

btn.dispatchEvent(new Event('click'))

const installBtn = document.querySelector('#installBtn')
installBtn.addEventListener('click', () => {
    console.log("Install renderer begin");
    fetch("http://127.0.0.1:5001/install").then((data)=>{      
        return data.text();
    }).then((text)=>{
        console.log("data: ", text);
        document.querySelector('#installReply').innerHTML = text
    }).catch(e=>{
        console.log(e);
        document.querySelector('#installReply').innerHTML = e
    })
    console.log("Install renderer end");
})

const signBtn = document.querySelector('#signBtn')
signBtn.addEventListener('click', () => {
    console.log("Sign renderer begin");
    fetch("http://127.0.0.1:5001/sign").then((data)=>{      
        return data.text();
    }).then((text)=>{
        console.log("data: ", text);
        document.querySelector('#signReply').innerHTML = text
    }).catch(e=>{
        console.log(e);
        document.querySelector('#signReply').innerHTML = e
    })
    console.log("Sign renderer end");
})

function f0(){
    console.log("000 f0()");
    console.log(foo);
    var kill = require('tree-kill');
    kill(foo);

//    fetch("http://127.0.0.1:5001/test").then((data)=>{      
//        return data.text();
//    }).then((text)=>{
//        console.log("data: ", text);
//        document.querySelector('#testReply').innerHTML = text
//    }).catch(e=>{
//        console.log(e);
//        document.querySelector('#testReply').innerHTML = e
//    })
}

const testBtn = document.querySelector('#testBtn')
testBtn.addEventListener('click', () => {
    f0();
})

require('electron').ipcRenderer.on('ping', (event, message) => {
      console.log(message) // Prints 'whoooooooh!'
    f0();
})

