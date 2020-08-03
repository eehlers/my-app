// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

function sendToPython() {
  var { PythonShell } = require('python-shell');

  let options = {
    mode: 'text',
    args: [input.value]
  };

  PythonShell.run('./py/calc.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: ', results);
    result.textContent = results[0];
  });

}

btn.addEventListener('click', () => {
  sendToPython();
});

btn.dispatchEvent(new Event('click'));

