import { ResourceLanguage } from 'i18next';

import germany from '../assets/images/flags/germany.jpg';
import italy from '../assets/images/flags/italy.jpg';
import russia from '../assets/images/flags/russia.jpg';
import spain from '../assets/images/flags/spain.jpg';
import usflag from '../assets/images/flags/us.jpg';

const languages: ResourceLanguage = {
  sp: {
    label: 'Spanish',
    flag: spain,
  },
  gr: {
    label: 'German',
    flag: germany,
  },
  it: {
    label: 'Italian',
    flag: italy,
  },
  rs: {
    label: 'Russia',
    flag: russia,
  },
  en: {
    label: 'English',
    flag: usflag,
  },
};

export default languages;
