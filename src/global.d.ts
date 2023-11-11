declare global {
  const d = 1;

  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    webkitCancelFullScreen?: () => Promise<void>;
    cancelFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
    webkitIsFullScreen?: boolean;
    mozFullScreen?: boolean;
  }
  interface HTMLElement {
    msRequestFullscreen: () => Promise<void>;
    mozRequestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen: () => Promise<void>;
  }
}

export {}; // Important !!
