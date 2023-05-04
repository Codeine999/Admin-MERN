import React, { useRef, useState } from 'react';
import Header from 'components/Header';
import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import SubmitButton from 'components/SubmitButton';
import { useRegisterMutation } from 'state/api';

const AddAdmin = () => {
  const [register] = useRegisterMutation();
  const [selectedFile, setSelectedFile] = useState(null);
  const formRef = useRef(null);

  const menuItems = [
    { label: 'Admin', value: 1 },
    { label: 'Editer', value: 2 },
  ];

  const handleRegister = async (event) => {
    event.preventDefault();
    const data = new FormData(formRef.current);
    try {
        await register(data);
    } catch (error) {
        console.error(error);
    }
};


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='ADD Admin' subtitle='List of Customers' />
      <Box borderRadius='15px' padding='20px'>
        <form
        ref={formRef}
          encType="multipart/form-data"
          style={{
            marginTop: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
          onSubmit={handleRegister}
        >
          <Stack direction={isSmallScreen ? 'column' : 'row'} gap={isSmallScreen ? 0 : 1}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16 }}>
                First Name
              </FormHelperText>
              <TextField fullWidth required name="firstname" id='firstname-input' color='info' variant='outlined' type='text' />
            </FormControl>
            {!isSmallScreen && <Box width={16} />}
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16 }}>
                Last name
              </FormHelperText>
              <TextField fullWidth required name="lastname" id='lastname-input' variant='outlined' color='info' type='text' />
            </FormControl>
          </Stack>

          <FormControl>
            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16 }}>
              Email
            </FormHelperText>
            <TextField fullWidth required name="email" id='email-input' variant='outlined' color='info' type='email' />
          </FormControl>

          <Stack direction={isSmallScreen ? 'column' : 'row'} gap={isSmallScreen ? 0 : 1}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16 }}>
                Password
              </FormHelperText>
              <TextField fullWidth required name="password" id='password-input' variant='outlined' color='info' type='password' />
            </FormControl>
            {!isSmallScreen && <Box width={16} />}
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16 }}>
                Role
              </FormHelperText>
              <Select
                variant='outlined'
                color='info'
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue=''
                name="type"
              >
                {menuItems.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack direction='column' gap={1} justifyContent='center' mb={2}>
            <Stack direction='row' gap={2}>
              <Typography fontSize={16} fontWeight={500} my='10px'>
                Picture Profile</Typography>

            <Button component="label" sx={{ width: 'fit-content', color: '#2ED480', textTransform: 'capitalize', fontSize: 16 }}>
              Upload *
              <input
                name="public_id"
                hidden
                accept="image/*"
                type="file"
                onChange={handleFileChange}
                
              />
            </Button>
          </Stack>
          <Typography fontSize={14} color="#fcfcfc" sx={{ wordBreak: 'break-all' }}>
            {/* {propertyImage?.name} */}
          </Typography>
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <SubmitButton onClick={handleRegister}  />
        </Box>
      </form>
    </Box>
    </Box>
  )
}

export default AddAdmin;