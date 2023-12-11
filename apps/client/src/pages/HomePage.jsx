/* eslint-disable no-mixed-spaces-and-tabs */
// import Home from "../services/home/index";

import { Button, Container, Grid, Typography } from "@mui/material";
import StyledCard from "../shared/components/Card";
import { GiClassicalKnowledge } from 'react-icons/gi';
import { GrTechnology } from "react-icons/gr";
import { RiHealthBookLine } from "react-icons/ri";
import { GrArticle } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
// import { SiCodereview } from "react-icons/si";
import { CategoryContextProvider } from "../contexts/CategoryContext";


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
      <Button variant="contained"  sx={{backgroundColor:'#2196f3'}} disableElevation endIcon={<IoIosSend />}>
        Create Articles
      </Button>
    </Grid>
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
		 			<CategoryContextProvider>
					<StyledCard data={data} defaultCategories={defaultCategories}/>
					 </CategoryContextProvider>
					</Grid>
		 		)
		 	})
		 }
		 </Grid>
		</>
	)
}