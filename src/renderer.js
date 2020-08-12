
let input = document.querySelector('#input')
let result = document.querySelector('#result')
let output = document.querySelector('#output')
let btn = document.querySelector('#btn')

require('electron').ipcRenderer.on('message', (event, message) => {
    console.log('renderer flask message:', message);
    output.textContent = message;
})

require('electron').ipcRenderer.on('stderror', (event, message) => {
    console.log('renderer flask stderror:', message);
    output.textContent = message;
})

function onclick(){
  fetch(`http://127.0.0.1:5001/calc/${input.value}`).then((data)=>{      
      console.log("data: ", data);
      return data.text();
  }).then((text)=>{
    console.log("text: ", text);
    result.textContent = text;
  }).catch(e=>{
    console.log("error :", e);
  })
}

btn.addEventListener('click', () => {
  onclick();
});

//btn.dispatchEvent(new Event('click'))

const installBtn = document.querySelector('#installBtn')
installBtn.addEventListener('click', () => {
    console.log("Install renderer begin");
    fetch("http://127.0.0.1:5001/install").then((data)=>{      
        console.log("data: ", data);
        return data.text();
    }).then((text)=>{
        console.log("text: ", text);
        document.querySelector('#installReply').innerHTML = text
    }).catch(e=>{
        console.log("error :", e);
        document.querySelector('#installReply').innerHTML = e
    })
    console.log("Install renderer end");
})

const signBtn = document.querySelector('#signBtn')
signBtn.addEventListener('click', () => {
    console.log("Sign renderer begin");
    fetch("http://127.0.0.1:5001/sign").then((data)=>{      
        console.log("data: ", data);
        return data.text();
    }).then((text)=>{
        console.log("text: ", text);
        document.querySelector('#signReply').innerHTML = text
    }).catch(e=>{
        console.log("error: ", e);
        document.querySelector('#signReply').innerHTML = e
    })
    console.log("Sign renderer end");
})

const {dialog} = require('electron').remote;

document.querySelector('#selectBtn').addEventListener('click', function (event) {
    filters = [
        { name: 'xxx', extensions: ['*.hex'] }
    ];
    options = {
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
        output.textContent = result.filePaths;
    }).catch(err => {
        console.log(err)
    });
});

