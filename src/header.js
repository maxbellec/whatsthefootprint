import React from 'react';

export function Header(){
    return <div style={{textAlign: 'center', marginTop: '10px', marginBottom: '20px'}}>
        <img src="/logo.png" alt="logo tomato" style={{'width': '22%'}}/>
        <div class="search-bar" style={{margin: 'auto', width: '40%', maxWidth: '500px', marginTop: '20px', marginBottom: '10px',}}>
            <input type="text" style={{fontSize: '16px', width: '100%'}} placeholder="search for any item: car, tomato, heating" />
        </div>
    </div>
}