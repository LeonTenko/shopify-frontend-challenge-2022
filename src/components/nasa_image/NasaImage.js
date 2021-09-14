import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
  },
  media: {
    height: "0",
    paddingTop: '56.25%',
    objectFit: 'cover',
  },
});

const NasaImage = ({ title, explanation, url, date, hdurl }) => {
  const [likeButton, setLikeButton] = React.useState(false);
  const [share, setShare] = React.useState(false);

  const classes = useStyles();

  const likeClicked = (event) => {
    likeButton ? setLikeButton(false) : setLikeButton(true);
  };

  const handleShare = (event) => {
    setShare(true);
    navigator.clipboard.writeText(hdurl);
  };

  const setLikeButtonColor = () => {
    return likeButton ? "primary" : "default";
  };
  const setLikeButtonVariant = () => {
    return likeButton ? "contained" : "outlined";
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShare(false);
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={url}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography gutterBottom variant="h6" component="h6">
            {date}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {explanation}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={likeClicked}
          size="small"
          variant={setLikeButtonVariant()}
          color={setLikeButtonColor()}
          endIcon={<Icon>thumb_up</Icon>}
        >
          Like
        </Button>
        <Button
          onClick={handleShare}
          size="small"
          variant="outlined"
          color="default"
          endIcon={<Icon>share</Icon>}
        >
          Share
        </Button>
      </CardActions>
      <Snackbar
        open={share}
        autoHideDuration={1300}
        onClose={handleClose}
      >
        <Alert severity="info" onClose={handleClose}>
          Link copied to clipboard
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default NasaImage;