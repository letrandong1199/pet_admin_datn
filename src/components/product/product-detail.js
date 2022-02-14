import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import postService from '../../services/post.service';
import { FiLogOut } from 'react-icons/fi'

const FormDialog = (props) => {
    const [imageStatus, setImageStatus] = React.useState(props.post.image_status);
    const [captionStatus, setCaptionStatus] = React.useState(props.post.caption_status);
    const [alertColor, setAlertColor] = React.useState('error');
    const [alertText, setAlertText] = React.useState('Fail');
    React.useEffect(() => {
        setImageStatus(props.post.image_status);
    }, [props.post.image_status])
    React.useEffect(() => {
        setCaptionStatus(props.post.caption_status);
    }, [props.post.caption_status])
    const handleChangeImageStatus = (e) => {
        setImageStatus(e.target.value);
    }
    const handleChangeCaptionStatus = (e) => {
        setCaptionStatus(e.target.value);
    }
    const handleSaveChange = () => {
        let data = {
            image_status: imageStatus,
            caption_status: captionStatus
        }
        postService.updateStatus(props.post.id, data).then(response => {
            console.log('Update status', response);
            if (response?.status === 200 && response?.data) {
                setAlertColor('success');
                setAlertText('Success');
            }
            return response?.data;
        })
        props.setIsAlert(true)
    }
    const AlertUpdate = (props) => (
        <Alert style={{ margin: '10px,0' }} severity={props.alertColor}>
            <AlertTitle>{props.alertText}</AlertTitle>
            Update status {props.alertText}
        </Alert>
    )
    console.log(props.isAlert);
    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                open={props.open}
                onClose={props.handleClose}
            >
                <DialogTitle>Post</DialogTitle>
                <DialogContent style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <DialogContentText style={{ width: '30%' }}>
                        <img
                            style={{ objectFit: 'cover', height: '80%', width: '100%' }}
                            src={props.post.media_url}
                        />
                        <FormControl sx={{ mt: 2, minWidth: '100%' }}>
                            <InputLabel htmlFor="image-status">Image Status</InputLabel>
                            <Select
                                // style={{ "&:focus": { background: imageStatus == "1" ? 'green' : imageStatus == "2" ? 'yellow' : 'red' } }}
                                value={imageStatus}
                                label="Image Status"
                                onChange={handleChangeImageStatus}
                            >
                                <MenuItem value={'allowed'}>Allowed</MenuItem>
                                <MenuItem value={'warning'}>Warnning</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContentText>
                    <DialogContentText style={{ width: '60%' }}>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={10}
                            fullWidth
                            disabled
                            value={props.post.caption}
                            style={{ width: '100%', height: '80%' }}
                        />
                        <FormControl sx={{ mt: 2, minWidth: '100%' }}>
                            <InputLabel htmlFor="caption-status">Caption Status</InputLabel>
                            <Select
                                value={captionStatus}
                                label="Caption Status"
                                onChange={handleChangeCaptionStatus}
                            >
                                <MenuItem value={'allowed'}>Allowed</MenuItem>
                                <MenuItem value={'warning'}>Warnning</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContentText>
                </DialogContent >
                {props.isAlert && <AlertUpdate alertColor={alertColor} alertText={alertText} />}
                <DialogActions>
                    <Button onClick={handleSaveChange}>Save Change</Button>
                    <Button onClick={props.handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog >
        </React.Fragment >
    );
}
export default FormDialog;