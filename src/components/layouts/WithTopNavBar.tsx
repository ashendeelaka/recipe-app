import React from 'react';
import { ClipLoader } from 'react-spinners';
import TopNavBar from './TopNavbar';

const WithTopNavBar = ({ children }: { children: React.ReactNode }) => {

    return (
        <div>
            <TopNavBar />
            {
                children
            }
        </div>
    )
}

export default WithTopNavBar;