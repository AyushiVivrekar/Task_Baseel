import React, { useState } from 'react';


function NavSection() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
           
            <button className="btn d-md-none" onClick={toggleSidebar}>
                {isOpen ? 'Close' : 'Open'} Menu
            </button>

            <div className={`overlay ${isOpen ? 'show' : ''}`} onClick={toggleSidebar}></div>

            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <nav className="nav flex-column nav-pills" id="v-pills-tab navsection" role="tablist" aria-orientation="vertical">
                    <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true" style={{color:"gray"}}>Management</a>
                    <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-profile" aria-selected="false" style={{color:"gray"}}>Profile</a>
                    <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-messages" aria-selected="false" style={{color:"gray"}}>Dashboard</a>
                    <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-messages" aria-selected="false" style={{color:"gray"}}>Documents</a>
                    <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-messages" aria-selected="false" style={{color:"gray"}}>Activity</a>
                    <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-settings" aria-selected="false" style={{color:"gray"}}>Settings</a>
                </nav>
            </div>

            <div className="main-content">
                <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><h5>Employee Management System</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A quod ab corporis nihil ipsam culpa fugiat commodi aliquam vero, praesentium temporibus</p></div>
                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">Profile Content</div>
                    <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">Dashboard Content</div>
                    <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">Documents Content</div>
                    <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">All Settings</div>
                </div>
            </div>
        </>
    );
}

export default NavSection;