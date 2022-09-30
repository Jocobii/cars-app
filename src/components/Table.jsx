import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Button } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deletePersonCar } from '../services/cars';
import { CarContext } from '../contexts/CarContext';
import peopleCarsAdapter from '../pages/Cars/adapters/adapter';

export default function BasicTable({ data, openModal }) {
  const [rows, setRows] = React.useState(data);
  const { setData } = useContext(CarContext);
  const handleDelete = async (carId) => {
    await deletePersonCar(carId);
    setRows(rows.filter((row) => row.carId !== carId));
  };
  const handleUpdate = (personId) => {
    const person = rows.find((row) => row.id === personId);
    setData((prev) => ({ ...prev, person: peopleCarsAdapter(person) }));
    openModal();
  };

  useEffect(() => {
    if (data.length > 0) {
      setRows(data);
    }
  }, [data]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nombres.</TableCell>
            <TableCell align="center">Numero Telefonico</TableCell>
            <TableCell align="center">Marca</TableCell>
            <TableCell align="center">Modelo</TableCell>
            <TableCell align="center">Controles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {`${row.name} ${row.firstname} ${row.lastname}`}
              </TableCell>
              <TableCell align="center">{row.phoneNumber}</TableCell>
              <TableCell align="center">{row.brandName}</TableCell>
              <TableCell align="center">{row.modelName}</TableCell>
              <TableCell align="center">
                <Button onClick={() => handleUpdate(row.id)}>Editar</Button>
                <Button onClick={() => handleDelete(row.carId)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

BasicTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  openModal: PropTypes.func.isRequired,
};
