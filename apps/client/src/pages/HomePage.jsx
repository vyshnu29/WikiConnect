/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
// import Home from "../services/home/index";

import { Avatar, Box, Button, Container, CssBaseline, Dialog, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import StyledCard from "../shared/components/Card";
import { GiClassicalKnowledge } from 'react-icons/gi';
import { GrTechnology } from "react-icons/gr";
import { RiHealthBookLine } from "react-icons/ri";
import { GrArticle } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
// import { SiCodereview } from "react-icons/si";
import { useDialog } from "../shared/hooks/useDialog";
import { PiArticleNyTimesThin } from "react-icons/pi";
import firebase from "firebase";
import React from "react";
import { CategoryContextProvider, useCategoryContext } from "../contexts/CategoryContext";

import { useArticlesContext } from "../contexts/ArticlesContext";

export default function HomePage() {
	
	const defaultCategories = [
	{
		category: "Knowledge",
		icon: <GiClassicalKnowledge size={44}/>,
		backGroundColor: '#16a085',
		color : 'white',
	},
	{
		category: "General",
		icon: <GrArticle size={44}/>,
		backGroundColor: '#3498db',
		color : 'white',
	},
	{
		category: "Technology",
		icon: <GrTechnology size={44}/>,
		backGroundColor: '#f5b041',
		color : 'white',
	},
	{
		category: "Health",
		icon: <RiHealthBookLine size={44}/>,
		backGroundColor: '#e74c3c',
		color : 'white',
	},
	
		
]

const { services , state} = useCategoryContext();

	React.useEffect(() => {
		services.getCategory();
	}, []);

	

const [categoryId, setcategoryId] = React.useState('');


  const handleChange = (event) => {
    setcategoryId(event.target.value);
  };
  

  
const handleSubmit = async(event) => {
	event.preventDefault();
	const data = new FormData(event.currentTarget);
	const payload = {
			title: data.get("title"),
  			content: data.get("content"),
  			categoryId: categoryId,
  			userId: firebase.auth().currentUser.uid,
  			isExist: true
			}
			console.log('data_res',payload)
			await services.addNewArticle(payload)
			// setLoading(false)
			handleClose()
};

const { open, handleClickOpen, handleClose } = useDialog();
	return(
	<>
		<Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
        Learn Together
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
		Join Wikiconnect to write, read, and discuss articles on various topics. 
		 Share your thoughts, and be part of a community that loves learning and sharing information.
        </Typography>
      </Container>
	  <Grid container  justifyContent="center" spacing={8}>
    <Grid item>
      <Button variant="contained" onClick={handleClickOpen}  sx={{backgroundColor:'#2196f3'}} disableElevation endIcon={<IoIosSend />}>
        Create Articles
      </Button>
    </Grid>
	<Dialog  open={open} onClose={handleClose}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
		  <PiArticleNyTimesThin size={26} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create article
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  autoComplete="given-name"
                  name="content"
                  required
                  fullWidth
                  id="content"
                  label="Content"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
			  <FormControl fullWidth >
        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={categoryId}
          onChange={handleChange}
          label="Category"
        >
			{
				state?.category?.map((item ,index) => {
					return(
						<MenuItem key={index} value={item?.categoryId}>{item?.name}</MenuItem>
					)
				}
				)
			}
        </Select>
      </FormControl>
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
          </Container>
      </Dialog>
    {/* <Grid item>
      <Button variant="contained" sx={{backgroundColor:'#4caf50'}} disableElevation endIcon={<SiCodereview />}>
        View More Articles
      </Button>
    </Grid> */}
  </Grid>

		<Grid container>
	
		 {
			defaultCategories.map((data, index) => {
		 		return(
					<Grid  key={index} justifyContent="space-between" spacing={9} item xs={12} sm={6} md={6} lg={3}>
					<StyledCard data={data} defaultCategories={defaultCategories}/>
					</Grid>
		 		)
		 	})
		 }
	
		 </Grid>
  
		</>
	)
}