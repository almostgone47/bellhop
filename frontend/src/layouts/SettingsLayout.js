import React from 'react';
import {NavLink} from 'react-router-dom';
import {Outlet} from 'react-router-dom';

const SettingsLayout = ({children}) => {
  return (
    <div className="settingsLayout">
      <aside className="settingsSidebar">
        <NavLink to="/settings/roomTypes">Manage Room Types</NavLink>
        <NavLink to="/settings/rooms">Manage Rooms</NavLink>
      </aside>
      <main className="settingsContent">
        <Outlet />
      </main>
    </div>
  );
};

export default SettingsLayout;
