import React from 'react';
import {
  Location,
  NavigateFunction,
  Params,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

export type RouterProps = {
  router?: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
};

function withRouter<P>(Component: React.FunctionComponent<P & RouterProps>) {
  const ComponentWithRouterProp = (props: P & RouterProps) => {
    const location: Location = useLocation();
    const navigate: NavigateFunction = useNavigate();
    const params: Readonly<Params<string>> = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };
  return ComponentWithRouterProp;
}

export default withRouter;
