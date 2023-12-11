/* eslint-disable react/prop-types */
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import { useArticlesContext } from '../../contexts/ArticlesContext';
import { PiArticleNyTimesThin } from "react-icons/pi";
import { useDialog } from '../hooks/useDialog';
import ViewArticle from '../../pages/ViewArticle';


export default function ArticleList(props) {
  const { services , state} = useArticlesContext();
  const {categoryId} = props
  const [selectedArticle, setSelectedArticle] = React.useState(null);

  

    React.useEffect(() => {
      services.getArticles(categoryId);
    }, []);

  const { open, handleClickOpen, handleClose } = useDialog();

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    handleClickOpen(true);
  };

  return (
    state.articles?.map((item ,index) => {
    if(item)
    {
      return(
        <>
        <List key={index} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <PiArticleNyTimesThin size={26} />
            </ListItemAvatar>
            <ListItemText
            onClick={() => {handleArticleClick(item)}}
              primary={
                <Typography sx={{color:'green', cursor:'pointer'}}>{item?.title}</Typography>
              }
              secondary={
                <React.Fragment>
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Created On : 
                  </Typography>
                  {new Date(item?.createdAt).toLocaleDateString()}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          
        </List>
        {selectedArticle && <ViewArticle article={selectedArticle} open={open} handleClose={handleClose} />}
    </>
        )
    }
    else{
      return(
        <div key={index}>
          <h1>No Articles Found</h1>
        </div>
      )
    
    }
  
  }
  )
  );
}