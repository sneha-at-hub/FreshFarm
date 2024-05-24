import React from 'react';
import AppFooter from './Components/AppFooter';
import AppHeader from './Components/AppHeader';
import PageContent from './Components/PageContent';
import SideMenu from './Components/SideMenu';
import './App.css';

const AdminPage1 = () => {
    return (
        <div className='Appxs'>
            <AppHeader />
            <div className="content-wrapper">
                <SideMenu />
                <PageContent />
            </div>
            <AppFooter />
        </div>
    );
};

export default AdminPage1;
