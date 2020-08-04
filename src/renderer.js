
let input = document.querySelector('#input')
let result = document.querySelector('#result')
let btn = document.querySelector('#btn')

function sendToPython_dev() {
  var { PythonShell } = require('python-shell');
  let options = {
    mode: 'text'
  };
  PythonShell.run('./py/server.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('response: ', results);
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
  fetch(`http://127.0.0.1:5001/${input.value}`).then((data)=>{      
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

