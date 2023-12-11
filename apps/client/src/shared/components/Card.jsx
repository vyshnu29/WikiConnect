/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ArticleList from './ArticleList';
import { useCategoryContext } from '../../contexts/CategoryContext';
import React from 'react';
import { ArticlesContextProvider } from '../../contexts/ArticlesContext';



//article card component
export default function StyledCard(props) {

    const {data} = props;
   
    const { services , state} = useCategoryContext();

    React.useEffect(() => {
      services.getCategory();
    }, []);

    

  return(
    state.category?.map((item ,index) => {
        if(item?.name === data?.category){
          return (
            <Card key={index} sx={{padding:4}} elevation={0}>
              <CardHeader
                sx={{backgroundColor : data?.backGroundColor, color: data?.color}}
                avatar={data?.icon}
                title={item?.name}
                titleTypographyProps={{ fontSize: '1.3rem' }}
                subheaderTypographyProps={{ fontSize: '1rem', color: 'white' }}
                subheader={item?.description}
              />
              <CardContent>
                <ArticlesContextProvider>
                <ArticleList categoryId={item?.categoryId}/>
                </ArticlesContextProvider>
              </CardContent>
            </Card>
          );
        }
         
        })
  )
      

  
}
