import React, { useContext } from 'react';
import GlobalContext from '../../Context/globalContext';

export default function Breadcrumb() {
  const globalContext = useContext(GlobalContext);
  const { breadcrumb } = globalContext;
  return (
    <>
      {breadcrumb.length > 0 ? (
        <>
          <div className="breadcrumb">
            {breadcrumb.map((item, index) => {
              if (index < breadcrumb.length - 1) {
                return (
                  <>
                    <p>{item}</p> <p> &gt;</p>
                  </>
                );
              } else {
                return <p>{item}</p>;
              }
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
