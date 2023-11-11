import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseTitleOptions {
  restoreOnUnmount?: boolean;
}

const DEFAULT_USE_TITLE_OPTIONS: UseTitleOptions = {
  restoreOnUnmount: false,
};

/**
 * Set the title of the page to the given title.
 * @param title
 * @param options
 */
function useTitle(title: string, options: UseTitleOptions = DEFAULT_USE_TITLE_OPTIONS) {
  const prevTitleRef: MutableRefObject<string> = useRef(document.title);

  useEffect(() => {
    if (document.title !== title) document.title = title;

    if (options && options.restoreOnUnmount) {
      // Copy the current value to prevTitle
      const prevTitle: string = prevTitleRef.current;
      return () => {
        // Don't use .current here since prevTitleRef might have changed
        document.title = prevTitle;
      };
    } else {
      return;
    }
  }, [options, title]);
}

export default typeof document !== 'undefined' ? useTitle : (_title: string) => {};
