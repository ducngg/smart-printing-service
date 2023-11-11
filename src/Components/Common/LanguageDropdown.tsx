import { get, keys, map, toString } from 'lodash';
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

//i18n
import usflag from 'assets/images/flags/us.jpg';

import languages from '../../common/languages';
import i18n from '../../i18n';

//img

const LanguageDropdown = () => {
  // Declare a new state variable, which we'll call "menu"
  const [selectedLang, setSelectedLang] = useState<string>('');
  const [menu, setMenu] = useState<boolean>(false);

  useEffect(() => {
    const currentLanguage: string | null = localStorage.getItem('I18N_LANGUAGE');
    setSelectedLang(currentLanguage || 'en');
  }, []);

  const changeLanguageAction = (lang: string) => {
    //set language as i18n
    i18n.changeLanguage(lang);
    localStorage.setItem('I18N_LANGUAGE', lang);
    setSelectedLang(lang);
  };

  const toggle = () => {
    setMenu(!menu);
  };

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={toggle} className='d-inline-block language-switch'>
        <DropdownToggle className='btn header-item ' tag='button'>
          <img
            src={get(toString(languages), `${selectedLang}.flag`) || usflag}
            alt='skote'
            height='16'
          />
        </DropdownToggle>
        <DropdownMenu className='dropdown-menu-end'>
          {map(keys(languages), (key) => (
            <DropdownItem
              key={key}
              onClick={() => changeLanguageAction(key)}
              className={`notify-item ${selectedLang === key ? 'active' : 'none'}`}
            >
              <img
                src={get(toString(languages), `${key}.flag`)}
                alt='skote'
                className='me-1'
                height='12'
              />
              <span className='align-middle'>{get(toString(languages), `${key}.label`)}</span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withTranslation()(LanguageDropdown);
