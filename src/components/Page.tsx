import React, { FunctionComponent, useEffect } from 'react';
import { Route } from 'react-router-dom';
import IPageProps from '../interfaces/PageProps';

const Page: FunctionComponent<IPageProps> = props => {
  useEffect(() => {
    document.title = "Adidas | " + props.title;
  });

  const { title, ...rest } = props;
  return <Route {...rest} />;
};

export default Page;
