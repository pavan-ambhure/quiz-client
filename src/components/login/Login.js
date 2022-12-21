import React, { useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Center from './Center';
import useForm from './../../hooks/useForm';
import { createAPIEndpoint, ENDPOINTS } from './../../api/index';
import useStateContext, { stateContext } from '../../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';
const getFreshModel = () => ({
  name: '',
  email: '',
});

function Login() {
  const { context, setContext, resetContext } = useStateContext(stateContext);

  const navigate = useNavigate();

  useEffect(() => {
    resetContext();
  }, []);
  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      createAPIEndpoint(ENDPOINTS.participant)
        .post(values)
        .then(
          (res) =>
            setContext({
              participantId: res.data.participantId,
            }),

          navigate('/quiz')
        )
        .catch((err) => console.log(err));
    }
  };

  const validate = () => {
    let temp = {};

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
      temp.email = '';
    } else {
      temp.email = 'Email is not valid.';
    }

    temp.name = values.name != '' ? '' : 'This field is required.';
    setErrors(temp);
    return Object.values(temp).every((x) => x == '');
  };

  return (
    <Center>
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant='h3' sx={{ my: 3 }}>
            QUIZ APP
          </Typography>
          <Box sx={{ '& .MuiTextField-root': { margin: 1, width: '90%' } }}>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
              <TextField
                id='email'
                label='Email'
                value={values.email}
                onChange={handleInputChange}
                variant='outlined'
                {...(errors.email && { error: true, helperText: errors.email })}
              />
              <TextField
                id='name'
                label='Name'
                value={values.name}
                onChange={handleInputChange}
                variant='outlined'
                {...(errors.name && { error: true, helperText: errors.name })}
              />

              <Button type='submit' variant='contained' sx={{ width: '90%' }}>
                Login
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
}

export default Login;
