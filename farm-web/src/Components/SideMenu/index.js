import React from 'react';

const SideMenu = () => {
    return (
        <div className='SideMenu'
             style={{ width: '250px', backgroundColor: '#f0f0f0', padding: '20px' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ marginBottom: '10px' }}>
                    <a href="/dashboard" style={{ textDecoration: 'none', color: '#333' }}>
                        Dashboard
                    </a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                    <a href="/products" style={{ textDecoration: 'none', color: '#333' }}>
                        Products
                    </a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                    <a href="/orders" style={{ textDecoration: 'none', color: '#333' }}>
                        Orders
                    </a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                    <a href="/customers" style={{ textDecoration: 'none', color: '#333' }}>
                        Customers
                    </a>
                </li>
                {/* Add more menu items as needed */}
            </ul>
        </div>
    );
};

export default SideMenu;
