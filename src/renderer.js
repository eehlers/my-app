
let output = document.querySelector('#output')
let psbtIn = document.querySelector('#psbtIn')
let psbtOut = document.querySelector('#psbtOut')
let fileName = document.querySelector('#fileName')
let sig0 = document.querySelector('#sig0')
let sig1 = document.querySelector('#sig1')
let sig2 = document.querySelector('#sig2')

psbtIn.value='cHNidP8BAF4CAAAAAZL7/GZbZP9h0Y5xp3VQ6qRbW2V5o3Zbo+p96yTaJGN4AAAAAAD9////AfrX9QUAAAAAIgAgxhAdPyAYn465zhugXhZqivH4lvBqpW1QqsVsAZk4R2AAAAAABPwCY3PYA0cwRQIhAJd5Zfh0v6e7R0GiyE/rhB471G5EJkc4FiFGFO0gg160AiAGb9OYHSzwNoBkAVpFfnHPUwoNPzxwP6s1FPFGb/4+REYwRAIgNWf4Tnc/zg0AT6WN4rh2/4FgFKRLATWUdpsl+I1OY9ECIExT61/JK+axgHLh9megmeU+nosYQ9yKR4tMNQVwATkqRzBFAiEA5yEJ0JlS8AR59XhDECd493tHCg19ffODo5Cr+1KeRHwCIB0FHkGUla0SaawnsEiUarMzFzqSO+n4jiu+AhmBBqjOAAEBKwDh9QUAAAAAIgAgW+bUOy/Cd54AJ1PNW7/O6s0hKNgg7zofoaxKsAa/mkIBBf1AAWNTIQLNIHufzwfTuhxHRN61yxlN+aCczFkIKVnWCCRp8ue8JCEC8Y8wZVTFYT6a73JYFLdchJ8BFlf4m1GYw/egWVVEiq8hAv0SmKGu1PVlnSj3H45pJFXhahb6X8pK2jubpTCE1piRIQMb/0wpyMBed0AJPK29O3tuMW4wUt0HO2GFPfoYhOfD1yEDIkVDuSzuZod03OVmPtqAAn1lHwDCYMl2ygyTdqc8b6RVrmcCkACydVIhAgnlb6Y/3bqcW0Gdhv1DYcYtDgdleEVWdlVYOVfQxDXqIQIwbYEdwDkL4OeLr08ZOoS2x/X66WFe9xJ9k7k9xGrmIyECtK4TLx2NTAXRBNOUTT/0nxng1RsrMyVVOVCBINYvjTkhArZnQxZYKRrh92PkoeET18vGQkaX/Q3B+Sp+ZnFovPC7VK5oIgYCzSB7n88H07ocR0TetcsZTfmgnMxZCClZ1ggkafLnvCQYhbR1JiwAAIABAACAAAAAgAAAAAAAAAAAIgYC8Y8wZVTFYT6a73JYFLdchJ8BFlf4m1GYw/egWVVEiq8YNN6Y2iwAAIABAACAAAAAgAAAAAAAAAAAIgYC/RKYoa7U9WWdKPcfjmkkVeFqFvpfykraO5ulMITWmJEY6C9ufiwAAIABAACAAAAAgAAAAAAAAAAAIgYDG/9MKcjAXndACTytvTt7bjFuMFLdBzthhT36GITnw9cYH31gSywAAIABAACAAAAAgAAAAAAAAAAAIgYDIkVDuSzuZod03OVmPtqAAn1lHwDCYMl2ygyTdqc8b6QYp9fRoCwAAIABAACAAAAAgAAAAAAAAAAAAAT8Y3N3BgABAAAAAAA='

function updateStatus(s) {
    if (s.substring(0, 5).toUpperCase() == "ERROR") {
        output.innerHTML = `<p style="color:red">${s}</p>`;
    } else {
        output.innerHTML = `<p style="color:green">${s}</p>`;
    }
}

require('electron').ipcRenderer.on('message', (event, message) => {
    console.log('renderer flask message:', message);
    updateStatus(message);
})

require('electron').ipcRenderer.on('stderror', (event, message) => {
    console.log('renderer flask stderror:', message);
    updateStatus(message);
})

const {dialog} = require('electron').remote;

document.querySelector('#selectBtn').addEventListener('click', function (event) {
    let filters = [
        { name: 'Bitcoin App (*.hex)', extensions: ['hex'] }
    ];
    dialog.showOpenDialog(null, {
        filters: filters,
        properties: ['openFile']
    }).then(result => {
        if (result.canceled) {
            updateStatus("File select cancelled.");
        } else {
            fileName.value = result.filePaths;
            updateStatus("File selected.");
        }
    }).catch(err => {
        console.log(err)
    });
});

const installBtn = document.querySelector('#installBtn')
installBtn.addEventListener('click', () => {
    if (!fileName.value) {
        updateStatus("Error: Empty file name.");
        alert("Error: Empty file name.");
        return;
    }
    if (!sig0.value) {
        updateStatus("Error: Signature #1 missing.");
        alert("Error: Signature #1 missing.");
        return;
    }
    if (!sig1.value) {
        updateStatus("Error: Signature #2 missing.");
        alert("Error: Signature #2 missing.");
        return;
    }
    if (!sig2.value) {
        updateStatus("Error: Signature #3 missing.");
        alert("Error: Signature #3 missing.");
        return;
    }
    updateStatus("Installing app...");
    let firmware = document.querySelector('#firmware')
    let firmwareValue = firmware.options[firmware.selectedIndex].value;
    let fileNameStr = fileName.value;
    let sig0Value = sig0.value;
    let sig1Value = sig1.value;
    let sig2Value = sig2.value;
    let b = new Buffer(fileNameStr);
    let fileNameB64 = b.toString('base64');
    console.log("firmwareValue: ", firmwareValue);
    console.log("fileNameStr: ", fileNameStr);
    fetch(`http://127.0.0.1:5001/install/${firmwareValue}/${sig0Value}/${sig1Value}/${sig2Value}/${fileNameB64}`).then((data)=>{
        console.log("data: ", data);
        return data.text();
    }).then((text)=>{
        console.log("text: ", text);
        updateStatus(text);
    }).catch(e=>{
        console.log("error :", e);
        updateStatus(e);
    })
})

const signBtn = document.querySelector('#signBtn')
signBtn.addEventListener('click', () => {
    psbtOut.value="";
    updateStatus("Signing PSBT...");
    let psbtInText = psbtIn.value;
    console.log("psbt in: ", psbtInText);
    let b = new Buffer(psbtInText);
    let s = b.toString('base64');
    fetch(`http://127.0.0.1:5001/sign/${s}`).then((data)=>{
        console.log("data: ", data);
        return data.text();
    }).then((text)=>{
        console.log("text: ", text);
        if (text.substring(0, 5).toUpperCase() == "ERROR") {
            updateStatus(text);
        } else {
            psbtOut.value=text;
            updateStatus("Sign done.");
        }
    }).catch(e=>{
        console.log("error: ", e);
        updateStatus(e);
    })
})

