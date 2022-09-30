export const BASE_URL = 'http://127.0.0.1:7123';

export const getModelsByBrandId = async (brandId) => {
  const response = await fetch(`${BASE_URL}/cars/models/${brandId}`);
  const { data } = await response.json();
  return data;
};

export const getBrands = async () => {
  const response = await fetch(`${BASE_URL}/cars/brands/`);
  const { data } = await response.json();
  return data;
};

export const savePerson = async (person) => {
  const response = await fetch(`${BASE_URL}/cars/person`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(person),
  });
  return response.json();
};

export const getPeopleCars = async () => {
  const response = await fetch(`${BASE_URL}/cars/people-cars`);
  const { data } = await response.json();
  return data;
};

export const deletePersonCar = async (carId) => {
  const response = await fetch(`${BASE_URL}/cars/people-car/${carId}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const updatePerson = async (person) => {
  const response = await fetch(`${BASE_URL}/cars/people-car`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(person),
  });
  return response.json();
};
