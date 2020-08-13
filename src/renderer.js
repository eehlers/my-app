
let output = document.querySelector('#output')
let psbtIn = document.querySelector('#psbtIn')
let psbtOut = document.querySelector('#psbtOut')

psbtIn.value='cHNidP8BAF4CAAAAAZL7/GZbZP9h0Y5xp3VQ6qRbW2V5o3Zbo+p96yTaJGN4AAAAAAD9////AfrX9QUAAAAAIgAgxhAdPyAYn465zhugXhZqivH4lvBqpW1QqsVsAZk4R2AAAAAABPwCY3PYA0cwRQIhAJd5Zfh0v6e7R0GiyE/rhB471G5EJkc4FiFGFO0gg160AiAGb9OYHSzwNoBkAVpFfnHPUwoNPzxwP6s1FPFGb/4+REYwRAIgNWf4Tnc/zg0AT6WN4rh2/4FgFKRLATWUdpsl+I1OY9ECIExT61/JK+axgHLh9megmeU+nosYQ9yKR4tMNQVwATkqRzBFAiEA5yEJ0JlS8AR59XhDECd493tHCg19ffODo5Cr+1KeRHwCIB0FHkGUla0SaawnsEiUarMzFzqSO+n4jiu+AhmBBqjOAAEBKwDh9QUAAAAAIgAgW+bUOy/Cd54AJ1PNW7/O6s0hKNgg7zofoaxKsAa/mkIBBf1AAWNTIQLNIHufzwfTuhxHRN61yxlN+aCczFkIKVnWCCRp8ue8JCEC8Y8wZVTFYT6a73JYFLdchJ8BFlf4m1GYw/egWVVEiq8hAv0SmKGu1PVlnSj3H45pJFXhahb6X8pK2jubpTCE1piRIQMb/0wpyMBed0AJPK29O3tuMW4wUt0HO2GFPfoYhOfD1yEDIkVDuSzuZod03OVmPtqAAn1lHwDCYMl2ygyTdqc8b6RVrmcCkACydVIhAgnlb6Y/3bqcW0Gdhv1DYcYtDgdleEVWdlVYOVfQxDXqIQIwbYEdwDkL4OeLr08ZOoS2x/X66WFe9xJ9k7k9xGrmIyECtK4TLx2NTAXRBNOUTT/0nxng1RsrMyVVOVCBINYvjTkhArZnQxZYKRrh92PkoeET18vGQkaX/Q3B+Sp+ZnFovPC7VK5oIgYCzSB7n88H07ocR0TetcsZTfmgnMxZCClZ1ggkafLnvCQYhbR1JiwAAIABAACAAAAAgAAAAAAAAAAAIgYC8Y8wZVTFYT6a73JYFLdchJ8BFlf4m1GYw/egWVVEiq8YNN6Y2iwAAIABAACAAAAAgAAAAAAAAAAAIgYC/RKYoa7U9WWdKPcfjmkkVeFqFvpfykraO5ulMITWmJEY6C9ufiwAAIABAACAAAAAgAAAAAAAAAAAIgYDG/9MKcjAXndACTytvTt7bjFuMFLdBzthhT36GITnw9cYH31gSywAAIABAACAAAAAgAAAAAAAAAAAIgYDIkVDuSzuZod03OVmPtqAAn1lHwDCYMl2ygyTdqc8b6QYp9fRoCwAAIABAACAAAAAgAAAAAAAAAAAAAT8Y3N3BgABAAAAAAA='

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
    output.innerHTML = "Installing app...";
    let fileName = document.querySelector('#fileName').innerHTML;
    console.log("fileName: ", fileName);
    let b = new Buffer(fileName);
    let s = b.toString('base64');
    fetch(`http://127.0.0.1:5001/install/${s}`).then((data)=>{      
        console.log("data: ", data);
        return data.text();
    }).then((text)=>{
        console.log("text: ", text);
        output.innerHTML = text;
    }).catch(e=>{
        console.log("error :", e);
        output.innerHTML = e;
    })
})

const signBtn = document.querySelector('#signBtn')
signBtn.addEventListener('click', () => {
    output.innerHTML = "Signing PSBT...";
    let psbtInText = psbtIn.value;
    console.log("psbt in: ", psbtInText);
    let b = new Buffer(psbtInText);
    let s = b.toString('base64');
    fetch(`http://127.0.0.1:5001/sign/${s}`).then((data)=>{      
        console.log("data: ", data);
        return data.text();
    }).then((text)=>{
        console.log("text: ", text);
        psbtOut.value=text;
        output.innerHTML = "Sign done.";
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

