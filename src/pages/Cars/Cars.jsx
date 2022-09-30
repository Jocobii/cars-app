import React, {
  useState, useContext, useEffect, useCallback,
} from 'react';
import { Button } from '@mui/material';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Fields from './components/Fields';
import { CarContext } from '../../contexts/CarContext';
import { getBrands, getPeopleCars } from '../../services/cars';

function Cars() {
  const [open, setOpen] = useState(false);
  const { data, setData } = useContext(CarContext);

  const getInitData = useCallback(async () => {
    const brandsNames = await getBrands();
    setData((prev) => ({ ...prev, brandsNames }));
  }, [setData]);

  const getData = useCallback(async () => {
    const cars = await getPeopleCars();
    setData((prev) => ({ ...prev, list: cars }));
  }, [setData]);

  useEffect(() => {
    getInitData();
    getData();
  }, [getInitData, getData]);

  const handleClose = () => {
    setOpen(false);
    setData((prev) => ({ ...prev, person: {} }));
    getData();
  };
  const openModal = () => setOpen(true);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        content={<Fields handleClose={handleClose} />}
      />
      <Table data={data.list} openModal={openModal} />
    </>
  );
}

export default Cars;
