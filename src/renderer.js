
let output = document.querySelector('#output')

require('electron').ipcRenderer.on('message', (event, message) => {
    console.log('renderer flask message:', message);
    output.innerHTML = message;
})

require('electron').ipcRenderer.on('stderror', (event, message) => {
    console.log('renderer flask stderror:', message);
    output.innerHTML = message;
})

const installBtn = document.querySelector('#installBtn')
installBtn.addEventListener('click', () => {
    let foo = document.querySelector('#fileName').innerHTML;
    let b = new Buffer(foo);
    let s = b.toString('base64');
    fetch(`http://127.0.0.1:5001/install/${s}`).then((data)=>{      
        console.log("foo: ", foo);
        console.log("data: ", data);
        return data.text();
    }).then((text)=>{
        console.log("text: ", text);
        output.innerHTML = text;
    }).catch(e=>{
        console.log("error :", e);
        //output.innerHTML = e;
    })
})

const signBtn = document.querySelector('#signBtn')
signBtn.addEventListener('click', () => {
    fetch("http://127.0.0.1:5001/sign").then((data)=>{      
        console.log("data: ", data);
        return data.text();
    }).then((text)=>{
        console.log("text: ", text);
        output.innerHTML = text;
    }).catch(e=>{
        console.log("error: ", e);
        output.innerHTML = e;
    })
})

const {dialog} = require('electron').remote;

document.querySelector('#selectBtn').addEventListener('click', function (event) {
    let filters = [
        { name: 'xxx', extensions: ['*.hex'] }
    ];
    let options = {
        //title: 'Select file',
        //buttonLabel: 'confirm',
        //filters: filters,
        properties: ['openFile']
        //message: 'message'
    };
    dialog.showOpenDialog(null, {
        //title: 'Select file',
        //buttonLabel: 'confirm',
        //filters: ['*.hex'],
        properties: ['openFile']
        //message: 'message'
    }).then(result => {
        console.log(result.canceled)
        console.log(result.filePaths)
        document.querySelector('#fileName').innerHTML = result.filePaths;
        output.innerHTML = '<p style="color:green">File selected.</p>';
    }).catch(err => {
        console.log(err)
    });
});

