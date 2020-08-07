
let input = document.querySelector('#input')
let result = document.querySelector('#result')
let btn = document.querySelector('#btn')

function sendToPython_dev() {
    let { PythonShell } = require('python-shell');
    let options = {
        mode: 'text'
    };
    PythonShell.run('./py/server.py', options, function (err, results) {
        if (err) throw err;
        console.log('response: ', results);
    }).on('message', function (message) {
        console.log('flask', message);
    }).on('stderror', function (message) {
        console.log('flask error', message);
    });
}

function sendToPython_prod() {
    pyProc = require('child_process').execFile("dist/server/server")
    if (pyProc != null) {
        //console.log(pyProc)
        //console.log('child process success on port ' + port)
        console.log('child process success')
    }
}

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

sendToPython_dev();
//sendToPython_prod();

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

