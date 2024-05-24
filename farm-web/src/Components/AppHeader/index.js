import React from 'react';
import gg from '../../uss.png'; // Adjust the path to point to the root directory

function AppHeader() {
    return (
        <div className="AppHeader" style={{ backgroundColor: '#fff', padding: '10px', display: 'flex', alignItems: 'center' }}>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'relative', marginRight: '20px' }}>
                    <img src={gg} alt="avatar" style={{ height: '50px', width: '50px', borderRadius: '50%' }} />
                </div>
            </div>
        </div>
    );
}

export default AppHeader;
