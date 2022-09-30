import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialValues = {
  modelsNames: [],
  list: [],
  brandsNames: [],
};

export const CarContext = createContext();

function CarProvider({ children }) {
  const [data, setData] = useState(initialValues);
  return (
    <CarContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ data, setData }}
    >
      {children}
    </CarContext.Provider>
  );
}

CarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CarProvider;
