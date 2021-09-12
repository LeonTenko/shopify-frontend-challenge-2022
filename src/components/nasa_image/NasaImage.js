import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
});

const NasaImage = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://apod.nasa.gov/apod/image/2109/LastRingPortrait_Cassini_1080.jpg"
          title="Nasa Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Test Image
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ulla
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="outlined" color="default" endIcon={<Icon>thumb_up</Icon>}>
          Like
        </Button>
      </CardActions>
    </Card>
  );
};

export default NasaImage;