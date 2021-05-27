import React from 'react'

export default function FileItem({name, id, onClick}) {
    return (
        <div className="file-item" onClick={onClick}>
            <input id={id} name="file" type="radio"/>
            <label htmlFor={id}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="35px" height="35px"><linearGradient id="PTsiEfj2THKtO9xz06mlla" x1="24" x2="24" y1="5" y2="43" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#21ad64"/><stop offset="1" stopColor="#088242"/></linearGradient><path fill="url(#PTsiEfj2THKtO9xz06mlla)" d="M39,16v25c0,1.105-0.895,2-2,2H11c-1.105,0-2-0.895-2-2V7c0-1.105,0.895-2,2-2h17L39,16z"/><path fill="#61e3a7" d="M28,5v9c0,1.105,0.895,2,2,2h9L28,5z"/><path fill="#107c42" d="M39,16h-9c-0.473,0-0.917-0.168-1.257-0.444L39,27V16z"/><path fill="#fff" d="M32,23H16c-0.553,0-1,0.448-1,1v12c0,0.552,0.447,1,1,1h16c0.553,0,1-0.448,1-1V24 C33,23.448,32.553,23,32,23z M17,29h4v2h-4V29z M23,29h8v2h-8V29z M31,27h-8v-2h8V27z M21,25v2h-4v-2H21z M17,33h4v2h-4V33z M23,35 v-2h8v2H23z"/><path d="M32,22.5c0.827,0,1.5,0.673,1.5,1.5v12c0,0.827-0.673,1.5-1.5,1.5H16c-0.827,0-1.5-0.673-1.5-1.5V24 c0-0.827,0.673-1.5,1.5-1.5H32 M32,22H16c-1.103,0-2,0.897-2,2v12c0,1.103,0.897,2,2,2h16c1.103,0,2-0.897,2-2V24 C34,22.897,33.103,22,32,22L32,22z" opacity=".05"/><path d="M32,23c0.553,0,1,0.448,1,1v12c0,0.552-0.447,1-1,1H16c-0.553,0-1-0.448-1-1V24c0-0.552,0.447-1,1-1 H32 M32,22.5H16c-0.827,0-1.5,0.673-1.5,1.5v12c0,0.827,0.673,1.5,1.5,1.5h16c0.827,0,1.5-0.673,1.5-1.5V24 C33.5,23.173,32.827,22.5,32,22.5L32,22.5z" opacity=".07"/></svg>
                <div className="text">{name}</div>
            </label>
            
        </div>
    )
}
