import React,{useState,useEffect} from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FullLayout from "../components/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from '../theme/theme';
import { useHistory } from 'react-router-dom';
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
const AddCategory = () => {
    const [name ,setName]=useState('');
    const [description , setDescription]=useState('');
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const navigate = useNavigate();
    const [Category, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    useEffect(() => {
      Axios.get('http://localhost:3001/api/getCategorie')
      .then((response) => {
        setCategories(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const options = Category.map((category) => ({
    id: category.id,
    name: category.name,
  }));
  const validateForm = () => {
    let isValid = true;
    let errors = {};
  
    // Add validation rules for each input field
    if (options.find((p) => p.name === name)) {
      errors.name = "Product name already exists";
      console.log(errors.name);
      isValid = false;
    }
    if (!name) {
      errors.name = "Category name is required";
      isValid = false;
    }
    if (!description) {
      errors.description = "Category description is required";
      isValid = false;
    }
    
    setErrors(errors);
    return isValid;
  };

    // const submitCategorie = (event) => {
    //   event.preventDefault();
    //   let nameError = name === '';
    //   let descriptionError = description === '';
    //   if (nameError || descriptionError) {
    //     setNameError(nameError);
    //     setDescriptionError(descriptionError);
    //     return;
    //   }
      
    //   // continue with form submission if no errors
    //   Axios.post('http://localhost:3001/api/insertCategorie', data)
    //   .then((response) => {
    //     console.log(response);
    //     navigate('/Categories?');
         
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     alert('Error adding category')
    //   });
    // };
    
    const submitCategorie = (event) => {
      event.preventDefault();
      if(validateForm()){
      Axios.post('http://localhost:3001/api/insertCategorie', data)
      .then((response) => {
        console.log(response);
        navigate('/Categories?');

      })
      .catch((error) => {
        console.error(error);
      });
    };
  };
    
    const handleNameChange =(event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange =( event) =>{
        setDescription(event.target.value);
    };


    const handleClearForm = () => {
        setName('');
        setDescription('');
      };

    const data={
        name: name,
        description : description,
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
      <Grid item xs={12} lg={12}>
        <BaseCard title="Add Categorie">
        <form onSubmit={submitCategorie}>
          <Stack spacing={3} >
          <TextField
          id="name"
          label="Product Name "
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          error={!!errors.name}
          helperText={errors.name}
          sx={{ width: "60%" }}
        />
        <TextField
          id="description"
          label="Description"
          multiline
          rows={4}
          onFocus={handleDescriptionFocus}
          value={description}
          onChange={handleDescriptionChange}
          error={!!errors.description}
          helperText={errors.description}
        />
          </Stack>
          <br />
          <Button type='submit' variant="contained" mt={2} >
            Submit
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
  )
}

export default AddCategory