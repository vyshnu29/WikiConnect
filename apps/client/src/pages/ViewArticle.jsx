/* eslint-disable react/prop-types */

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ViewArticle(props) {
    const {article} = props

  return (

      <Dialog
        open={props?.open}
        onClose={props?.handleClose}
        
      >
        <DialogTitle id="scroll-dialog-title">{article?.title}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
          
          >
            {article?.content}
          </DialogContentText>
        </DialogContent>
        
      </Dialog>

  );
}