import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import useAppSelector from 'hooks/useAppSelector';
import { RootState } from 'slices';

import withRouter from '../../Common/withRouter';

const ProfileMenu = () => {
  const [menu, setMenu] = useState(false);

  const { user } = useAppSelector((state: RootState) => state.Login);

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className='d-inline-block'>
        <DropdownToggle className='btn header-item ' id='page-header-user-dropdown' tag='button'>
          <img
            className='rounded-circle header-profile-user'
            src={user?.picture}
            alt='Header Avatar'
          />
          <span className='d-none d-xl-inline-block ms-2 me-1'>{user?.name}</span>
          <i className='mdi mdi-chevron-down d-none d-xl-inline-block' />
        </DropdownToggle>
        <DropdownMenu className='dropdown-menu-end'>
          <DropdownItem tag='a' href='/profile'>
            {' '}
            <i className='bx bx-user font-size-16 align-middle me-1' />
            Tài khoản của tôi
          </DropdownItem>

          {/* <DropdownItem tag="a" href="#">
            <i className="bx bx-wrench font-size-16 align-middle me-1" />
            Cài đặt
          </DropdownItem> */}
          <div className='dropdown-divider' />
          <Link to='/logout' className='dropdown-item'>
            <i className='bx bx-power-off font-size-16 align-middle me-1 text-danger' />
            <span>Đăng xuất</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withRouter(ProfileMenu);
