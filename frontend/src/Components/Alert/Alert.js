import React, { useContext } from 'react';
import GlobalContext from '../../Context/globalContext';

export default function Alert() {
  const globalContext = useContext(GlobalContext);

  const { error } = globalContext;
 

  return <div>{error.message}</div>;
}
