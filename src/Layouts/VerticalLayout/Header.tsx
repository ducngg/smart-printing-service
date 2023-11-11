import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import NotificationDropdown from 'Components/CommonForBoth/NotificationDropDown';

import logo from '../../assets/images/logo-light.png';
import ProfileMenu from '../../Components/CommonForBoth/TopBarDropDown/ProfileMenu';
const logoLightSvg = logo;

const Header = () => {
  const [search, setsearch] = useState(false);

  const toggleFullscreen = () => {
    document.body.classList.add('fullscreen-enable');
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullscreen) {
        document.documentElement.mozRequestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.cancelFullscreen) {
        document.cancelFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
    // handle fullscreen exit
    const exitHandler = () => {
      if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
        document.body.classList.remove('fullscreen-enable');
    };
    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
  };

  function tToggle() {
    const body: HTMLElement = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle('sidebar-enable');
    } else {
      body.classList.toggle('vertical-collpsed');
      body.classList.toggle('sidebar-enable');
    }
  }

  return (
    <React.Fragment>
      <header id='page-topbar'>
        <div className='navbar-header'>
          <div className='d-flex'>
            <div className='navbar-brand-box d-lg-none d-md-block'>
              <Link to='/' className='logo logo-dark'>
                <span className='logo-sm'>
                  <img src={logo} alt='' width='55' height='55' />
                </span>
              </Link>

              <Link to='/' className='logo logo-light'>
                <span className='logo-sm'>
                  <img src={logoLightSvg} alt='' width='55' height='55' />
                </span>
              </Link>
            </div>

            <button
              type='button'
              onClick={() => {
                tToggle();
              }}
              className='btn btn-sm px-3 font-size-16 header-item '
              id='vertical-menu-btn'
            >
              <i className='fa fa-fw fa-bars' />
            </button>
          </div>
          <div className='d-flex'>
            <div className='dropdown d-inline-block d-lg-none ms-2'>
              <button
                onClick={() => {
                  setsearch(!search);
                }}
                type='button'
                className='btn header-item noti-icon '
                id='page-header-search-dropdown'
              >
                <i className='mdi mdi-magnify' />
              </button>
              <div
                className={
                  search
                    ? 'dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show'
                    : 'dropdown-menu dropdown-menu-lg dropdown-menu-end p-0'
                }
                aria-labelledby='page-header-search-dropdown'
              >
                <form className='p-3'>
                  <div className='form-group m-0'>
                    <div className='input-group'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Search ...'
                        aria-label="Recipient's username"
                      />
                      <div className='input-group-append'>
                        <button className='btn btn-primary' type='submit'>
                          <i className='mdi mdi-magnify' />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <NotificationDropdown />

            <div className='dropdown d-none d-lg-inline-block ms-1'>
              <button
                type='button'
                onClick={() => {
                  toggleFullscreen();
                }}
                className='btn header-item noti-icon '
                data-toggle='fullscreen'
              >
                <i className='bx bx-fullscreen' />
              </button>
            </div>

            <ProfileMenu />

            {/* <div
              className="dropdown d-inline-block"
            >
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle"
                onClick={() => navigate("/settings")}
              >
                <i className="bx bx-cog" />
              </button>
            </div> */}
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default withTranslation()(Header);
