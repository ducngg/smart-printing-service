import React from 'react';
import { Link } from 'react-router-dom';

import logoDark from '../../assets/images/logo-dark.png';
import logo from '../../assets/images/logo-light.png';

import SidebarContent from './SidebarContent';

const logoLightPng: string = logo;
const logoLightSvg: string = logo;

type SidebarProps = {
  type?: string;
};

const Sidebar = ({ type }: SidebarProps) => {
  return (
    <React.Fragment>
      <div className='vertical-menu'>
        <div className='navbar-brand-box'>
          <Link to='/' className='logo logo-dark'>
            <span className='logo-sm'>
              <img src={logo} alt='logo' width='55' height='55' />
            </span>
            <span className='logo-lg'>
              <img src={logoDark} alt='logo' height='17' />
            </span>
          </Link>

          <Link to='/' className='logo logo-light'>
            <span className='logo-sm'>
              <img
                src={logoLightSvg}
                style={{ objectFit: 'cover' }}
                alt='logo'
                width='55'
                height='55'
              />
            </span>
            <span className='logo-lg'>
              <img
                src={logoLightPng}
                style={{ objectFit: 'cover' }}
                alt='logo'
                width='55'
                height='55'
              />
            </span>
          </Link>
        </div>
        <div data-simplebar className='h-100'>
          {type !== 'condensed' ? <SidebarContent /> : <SidebarContent />}
        </div>
        <div className='sidebar-background'></div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
