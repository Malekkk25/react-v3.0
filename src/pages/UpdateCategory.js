import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,  useNavigate } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from '../theme/theme';
import FullLayout from "../components/layouts/FullLayout";
import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
  } from "@mui/material";
  import BaseCard from '../components/baseCard/BaseCard';

const UpdateCategory = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const history = useNavigate();

  

  useEffect(() => {
    axios.get(`http://localhost:3001/api/categories/${id}`)
      .then(response => {
        const {id,name, description } = response.data;
        setName(name);
        setDescription(description);
        console.log(name)
      })
      .catch(error => console.log(error));
  }, [id]);
  

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    let nameError = name === '';
    let descriptionError = description === '';
    if (nameError || descriptionError) {
      setNameError(nameError);
      setDescriptionError(descriptionError);
      return;
    }
    const data = {
      id: id,
      name: name,
      description: description
    };

    axios.put(`http://localhost:3001/api/categories/${id}`, data)
      .then(response => {
        console.log(response);
        history('/categories');
      })
      .catch(error => console.log(error));
  };
  const handleClearForm = () => {
    setName('');
   setDescription('');
  };

  const handleNameFocus = () => {
    setNameError("")
    
  }
  const handleDescriptionFocus = () => {
    setDescriptionError("")
    
  }

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12} sx={{ textAlign: 'left' }}>
        <BaseCard title="Update Categorie" >
        <form onSubmit={handleSubmit} >
        <Stack spacing={1} sx={{ marginTop: '-50px', paddingTop: '10px' }} >
            <TextField
              id="name"
              label="Category Name"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              error={nameError}
              helperText={nameError ? 'Please enter a category name' : ''}
              onFocus={handleNameFocus}

            />
            
            <TextField
              id="description"
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
              error={descriptionError}
              helperText={descriptionError ? 'Please enter a description' : ''}
              onFocus={handleDescriptionFocus}
            />
          </Stack>
          <br />
          <Button type="submit" variant="contained">
            Update Category
          </Button>
          <Button variant="outlined" sx={{ ml: '10px' }} onClick={handleClearForm}>
  Clear Form
</Button>
        </form>
        </BaseCard>
      </Grid>
    </Grid>
      </FullLayout>
      </ThemeProvider>
  );
};

export default UpdateCategory;