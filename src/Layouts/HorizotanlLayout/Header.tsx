import React, { useState } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

// Import menuDropdown
// import NotificationDropDown from "../../Components/CommonForBoth/NotificationDropDown";

// import images
import bitbucket from '../../assets/images/brands/bitbucket.png';
import dribbble from '../../assets/images/brands/dribbble.png';
import dropbox from '../../assets/images/brands/dropbox.png';
import github from '../../assets/images/brands/github.png';
import mail_chimp from '../../assets/images/brands/mail_chimp.png';
import slack from '../../assets/images/brands/slack.png';
import logoDark from '../../assets/images/logo-dark.png';
import logo from '../../assets/images/logo-light.png';
import megamenuImg from '../../assets/images/megamenu-img.png';
import LanguageDropdown from '../../Components/Common/LanguageDropdown';
import ProfileMenu from '../../Components/CommonForBoth/TopBarDropDown/ProfileMenu';

const logoLight = logo;
const logoLightSvg = logo;

type HeaderProps = {
  toggleLeftmenu: () => void;
  toggleCanvas: () => void;
};

const Header = ({ toggleCanvas, toggleLeftmenu }: HeaderProps) => {
  const { t } = useTranslation() as {
    t: (args: string) => string;
  };
  const [menu, setMenu] = useState<boolean>(false);
  const [isSearch, setSearch] = useState<boolean>(false);
  const [socialDrp, setsocialDrp] = useState<boolean>(false);

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
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
  }

  return (
    <React.Fragment>
      <header id='page-topbar'>
        <div className='navbar-header'>
          <div className='d-flex'>
            <div className='navbar-brand-box'>
              <Link to='/' className='logo logo-dark'>
                <span className='logo-sm'>
                  <img src={logo} alt='logo' width='55' height='55' />
                </span>
                <span className='logo-lg'>
                  <img src={logoDark} alt='logo' width='55' height='55' />
                </span>
              </Link>

              <Link to='/' className='logo logo-light'>
                <span className='logo-sm'>
                  <img src={logoLightSvg} alt='logo' width='55' height='55' />
                </span>
                <span className='logo-lg'>
                  <img src={logoLight} alt='logo' width='55' height='55' />
                </span>
              </Link>
            </div>

            <button
              type='button'
              className='btn btn-sm px-3 font-size-16 d-lg-none header-item'
              data-toggle='collapse'
              onClick={toggleLeftmenu}
              data-target='#topnav-menu-content'
            >
              <i className='fa fa-fw fa-bars' />
            </button>

            <form className='app-search d-none d-lg-block'>
              <div className='position-relative'>
                <input type='text' className='form-control' placeholder='Search...' />
                <span className='bx bx-search-alt' />
              </div>
            </form>

            <Dropdown
              className='dropdown-mega d-none d-lg-block ms-2'
              isOpen={menu}
              toggle={() => setMenu(!menu)}
            >
              <DropdownToggle className='btn header-item ' caret tag='button'>
                {t('Mega Menu')} <i className='mdi mdi-chevron-down' />
              </DropdownToggle>
              <DropdownMenu className='dropdown-megamenu'>
                <Row>
                  <Col sm={8}>
                    <Row>
                      <Col md={4}>
                        <h5 className='font-size-14 mt-0'>{t('UI Components')}</h5>
                        <ul className='list-unstyled megamenu-list'>
                          <li>
                            <Link to='#'>{t('Lightbox')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Range Slider')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Sweet Alert')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Rating')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Forms')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Tables')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Charts')}</Link>
                          </li>
                        </ul>
                      </Col>

                      <Col md={4}>
                        <h5 className='font-size-14 mt-0'>{t('Applications')}</h5>
                        <ul className='list-unstyled megamenu-list'>
                          <li>
                            <Link to='#'>{t('Ecommerce')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Calendar')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Email')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Projects')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Tasks')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Contacts')}</Link>
                          </li>
                        </ul>
                      </Col>

                      <Col md={4}>
                        <h5 className='font-size-14 mt-0'>{t('Extra Pages')}</h5>
                        <ul className='list-unstyled megamenu-list'>
                          <li>
                            <Link to='#'>{t('Light Sidebar')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Compact Sidebar')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Horizontal layout')}</Link>
                          </li>
                          <li>
                            <Link to='#'> {t('Maintenance')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Coming Soon')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Timeline')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('FAQs')}</Link>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={4}>
                    <Row>
                      <Col sm={6}>
                        <h5 className='font-size-14 mt-0'>{t('UI Components')}</h5>
                        <ul className='list-unstyled megamenu-list'>
                          <li>
                            <Link to='#'>{t('Lightbox')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Range Slider')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Sweet Alert')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Rating')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Forms')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Tables')}</Link>
                          </li>
                          <li>
                            <Link to='#'>{t('Charts')}</Link>
                          </li>
                        </ul>
                      </Col>

                      <Col sm={5}>
                        <div>
                          <img src={megamenuImg} alt='' className='img-fluid mx-auto d-block' />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className='d-flex'>
            <div className='dropdown d-inline-block d-lg-none ms-2'>
              <button
                type='button'
                className='btn header-item noti-icon '
                id='page-header-search-dropdown'
                onClick={() => setSearch(!isSearch)}
              >
                <i className='mdi mdi-magnify' />
              </button>
              <div
                className={
                  isSearch
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
                        placeholder={t('Search') + '...'}
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

            <LanguageDropdown />

            <Dropdown
              className='d-none d-lg-inline-block ms-1'
              isOpen={socialDrp}
              toggle={() => {
                setsocialDrp(!socialDrp);
              }}
            >
              <DropdownToggle className='btn header-item noti-icon ' caret tag='button'>
                <i className='bx bx-customize' />
              </DropdownToggle>
              <DropdownMenu className='dropdown-menu-lg dropdown-menu-end'>
                <div className='px-lg-2'>
                  <Row className='no-gutters'>
                    <Col>
                      <Link className='dropdown-icon-item' to='#'>
                        <img src={github} alt='Github' />
                        <span>GitHub</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className='dropdown-icon-item' to='#'>
                        <img src={bitbucket} alt='bitbucket' />
                        <span>Bitbucket</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className='dropdown-icon-item' to='#'>
                        <img src={dribbble} alt='dribbble' />
                        <span>Dribbble</span>
                      </Link>
                    </Col>
                  </Row>
                  <Row className='no-gutters'>
                    <Col>
                      <Link className='dropdown-icon-item' to='#'>
                        <img src={dropbox} alt='dropbox' />
                        <span>Dropbox</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className='dropdown-icon-item' to='#'>
                        <img src={mail_chimp} alt='mail_chimp' />
                        <span>Mail Chimp</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className='dropdown-icon-item' to='#'>
                        <img src={slack} alt='slack' />
                        <span>Slack</span>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </DropdownMenu>
            </Dropdown>

            <div className='dropdown d-none d-lg-inline-block ms-1'>
              <button
                type='button'
                className='btn header-item noti-icon '
                onClick={() => {
                  toggleFullscreen();
                }}
                data-toggle='fullscreen'
              >
                <i className='bx bx-fullscreen' />
              </button>
            </div>

            {/* <NotificationDropdown /> */}

            <ProfileMenu />

            <div className='dropdown d-inline-block'>
              <button
                onClick={toggleCanvas}
                type='button'
                className='btn header-item noti-icon right-bar-toggle '
              >
                <i className='bx bx-cog bx-spin' />
              </button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default withTranslation()(Header);
