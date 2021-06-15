import React from 'react';

var installPrompt;
window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
    console.log(installPrompt);
})


export default function InstallPrompt() {
    const handleClick = ()=>{
        installPrompt.prompt();
    }
    if(!installPrompt) return;
    return (
        <button onClick={handleClick}>Install App</button>
    )
}
