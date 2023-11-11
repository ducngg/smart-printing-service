import Lottie from 'react-lottie';

import loadingAnimation from '../../assets/animations/loading.json';

type LoadingProps = {
  width: number;
  height: number;
};

const Loading = ({ width, height }: LoadingProps) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
  };
  return (
    <Lottie
      options={defaultOptions}
      height={height}
      width={width}
      isStopped={false}
      isPaused={false}
    />
  );
};

export default Loading;
