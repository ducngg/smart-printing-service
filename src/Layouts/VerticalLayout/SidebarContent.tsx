import MetisMenu from 'metismenujs';
import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SimpleBar, { SimpleBarCore } from 'simplebar-react';

import withRouter, { RouterProps } from 'Components/Common/withRouter';
import useAppDispatch from 'hooks/useAppDispatch';
import { logoutUser } from 'slices/thunk';

type SidebarContentProps = RouterProps;

type TempSimpleBarCore = {
  recalculate: () => void;
  getScrollElement: () => HTMLElement | null;
};

const SidebarContent = ({ router }: SidebarContentProps) => {
  const ref = useRef<SimpleBarCore | null>(null);

  const activateParentDropdown = useCallback((item: HTMLElement) => {
    item.classList.add('active');
    const parent: Element | null = item.parentElement;
    const parent2El: Element | undefined = parent?.children[1];

    if (parent2El && parent2El?.id !== 'side-menu') {
      parent2El.classList.add('mm-show');
    }

    if (parent) {
      parent.classList.add('mm-active');
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add('mm-show'); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add('mm-active'); // li
          parent3.children[0].classList.add('mm-active'); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add('mm-show'); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add('mm-show'); // li
              parent5.children[0].classList.add('mm-active'); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items: HTMLElement[]) => {
    for (let i = 0; i < items.length; ++i) {
      const item: Element = items[i];
      const parent: Element | null = items[i].parentElement;

      if (item && item.classList.contains('active')) {
        item.classList.remove('active');
      }
      if (parent) {
        const parent2El: Element | null =
          parent.children && parent.children.length && parent.children[1]
            ? parent.children[1]
            : null;
        if (parent2El && parent2El.id !== 'side-menu') {
          parent2El.classList.remove('mm-show');
        }

        parent.classList.remove('mm-active');
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove('mm-show');

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove('mm-active'); // li
            parent3.children[0].classList.remove('mm-active');

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove('mm-show'); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove('mm-show'); // li
                parent5.children[0].classList.remove('mm-active'); // a tag
              }
            }
          }
        }
      }
    }
  };

  const activeMenu = useCallback(() => {
    const pathName: string | undefined = router?.location.pathname;
    let matchingMenuItem: HTMLAnchorElement | null = null;
    const ul: HTMLElement | null = document.getElementById('side-menu');
    const itemsCollection = ul?.getElementsByTagName('a');
    const items: HTMLAnchorElement[] | undefined = Array.from(itemsCollection || []);
    if (!items) {
      console.error('cannot call activeMenu()');
      return;
    }
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [router?.location.pathname, activateParentDropdown]);

  useEffect(() => {
    (ref?.current as TempSimpleBarCore).recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu('#side-menu');
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item: HTMLElement) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight && ref?.current) {
        const scrollHTMLElement: HTMLElement | null = (
          ref.current as TempSimpleBarCore
        ).getScrollElement();
        if (scrollHTMLElement) {
          scrollHTMLElement.scrollTop = currentPosition - 300;
        }
      }
    }
  }

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <React.Fragment>
      <SimpleBar className='h-100' ref={ref}>
        <div id='sidebar-menu'>
          <ul className='metismenu list-unstyled' id='side-menu'>
            <li className='menu-title'>FOR STUDENTS</li>
            <li>
              <Link to='/print-documents'>
                <i className='bx bx-home-circle'></i>
                <span>Print Documents</span>
              </Link>
            </li>
            <li>
              <Link to='/print-history'>
                <i className='bx bx-time-five'></i>
                <span>Print history</span>
              </Link>
            </li>
            <li>
              <Link to='/print-documents'>
                <i className='bx bx-cart'></i>
                <span>Buy printing page</span>
              </Link>
            </li>
            <li className='menu-title'>GENERAL</li>
            <li>
              <Link to='/profile'>
                <i className='bx bx-user-circle'></i>
                <span>My Profile</span>
              </Link>
            </li>
            <li>
              <Link to='/profile'>
                <i className='mdi mdi-alert'></i>
                <span>Report an issue</span>
              </Link>
            </li>
            <li>
              <Link to='#' onClick={handleLogout}>
                <i
                  className='mdi mdi-arrow-expand-left
'
                ></i>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};
export default withRouter(SidebarContent);
