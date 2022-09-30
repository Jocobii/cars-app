const peopleCarsAdapter = (data) => ({
  id: data.id,
  name: data.name,
  firstName: data.firstname,
  lastName: data.lastname,
  phoneNumber: data.phoneNumber,
  brand: data.brandId,
  model: data.modelId,
});

export default peopleCarsAdapter;
