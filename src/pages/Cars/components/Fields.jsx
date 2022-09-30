import React, { useContext, useCallback } from 'react';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';

import { CarContext } from '../../../contexts/CarContext';
import {
  getModelsByBrandId,
  savePerson,
  updatePerson,
} from '../../../services/cars';

const formSchema = yup.object({
  name: yup.string('Enter your name').required('Name is required'),
  firstName: yup.string('Enter your name').required('First name is required'),
  lastName: yup.string('Enter your name').required('Last name is required'),
  phoneNumber: yup
    .string('Enter your phone number')
    .required('Phone number is required'),
  brand: yup.number().required('brand is required'),
  model: yup.number().required('brand is required'),
});

export default function Fields({ handleClose }) {
  const { data, setData } = useContext(CarContext);

  const handleChangeBrand = useCallback(
    async (brandId) => {
      const modelsNames = await getModelsByBrandId(brandId);
      setData((prev) => ({ ...prev, modelsNames }));
    },
    [setData],
  );

  // useEffect(() => {
  //   if (formik.values.brand) {
  //     handleChangeBrand(formik.values.brand);
  //   }
  // }, [formik.values.brand, handleChangeBrand]);
  return (
    <Formik
      initialValues={data.person}
      validationSchema={formSchema}
      onSubmit={async (values) => {
        const addOrUpdate = values.id ? updatePerson : savePerson;
        await addOrUpdate(values);
        handleClose();
      }}
    >
      {({ values, handleChange }) => (
        <Form>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                name="name"
                value={values.name}
                id="demo-helper-text-aligned"
                label="Name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                helperText=" "
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                id="demo-helper-text-aligned-no-helper"
                label="First name"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                helperText=" "
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                id="demo-helper-text-aligned-no-helper"
                label="Last name"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                helperText=" "
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                id="demo-helper-text-aligned-no-helper"
                label="Phone number"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Brand
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  name="brand"
                  value={values.brand}
                  onChange={(e) => {
                    handleChangeBrand(e.target.value);
                    handleChange(e);
                  }}
                >
                  {data.brandsNames.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Models
                </InputLabel>
                <Select
                  name="model"
                  values={values.model}
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  onChange={handleChange}
                >
                  {data.modelsNames.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Button type="submit">Save</Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

Fields.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
