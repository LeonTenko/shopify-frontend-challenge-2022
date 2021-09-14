import './App.css';
import React from 'react';
import NasaImage from './components/nasa_image/NasaImage';

// Material Ui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => {
  return (
    {
      root: {
        flexGrow: 1,
      },

      navBar: {
        background: "#222629",
      },

      textField: {
        '& label': {
          color: "white",
        },
        '& label.Mui-focused': {
          color: "white",
        },
        '& input.MuiInputBase-input': {
          color: "white"
        },
      },
      noMargin: {
        margin: "0",
      }
    }
  );
});

function App() {
  const classes = useStyles();

  const [nasaImages, setNasaImages] = React.useState([]);
  const [picOfDay, setPicOfDay] = React.useState([]);
  const [podCheck, setPodCheck] = React.useState(true);
  const [displayImages, setDisplayImages] = React.useState([]);
  const [urlParams, setUrlParams] = React.useState(
    {
      count: "1",
    }
  );

  const url = new URL("https://api.nasa.gov/planetary/apod");
  const apiKey = "EYNdwCv2ngW0Sf5h9ZUVICjuKhYNGNho47VOoZO6";
  url.searchParams.append("api_key", apiKey);
  const fetchParams = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  };

  const getPicOfDay = async () => {
    if (picOfDay.length === 0) {
      let response = await fetch(url, fetchParams);

      const responseJSON = await response.json();

      setPicOfDay([responseJSON]);
    }
  };

  const getNasaImages = async () => {

    Object.keys(urlParams).forEach(key => url.searchParams.append(key, urlParams[key]));

    let response = await fetch(url, fetchParams);

    let responseJSON = await response.json();

    // Make it into an array of 1 if it's not by default.
    if (!Array.isArray(responseJSON)) {
      responseJSON = [responseJSON];
    }

    setNasaImages(responseJSON);
  };

  React.useEffect(() => {
    getPicOfDay();
    getNasaImages();
  }, [urlParams]);

  React.useEffect(() => {
    setDisplayImages([...picOfDay, ...nasaImages]);
  }, [picOfDay, nasaImages, podCheck]);

  const handlePodCheck = () => {
    setPodCheck(!podCheck);
  };

  const handleRnadomImageNum = (event) => {
    setUrlParams({
      count: event.target.value,
    });
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.navBar}>
        <Toolbar variant="dense">
          <Typography className={classes.root} variant="h6" color="inherit">
            Spacestagram
          </Typography>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  name="podCheck"
                  checked={podCheck}
                  onChange={handlePodCheck}
                />
              }
              label="Picture of the Day"
            />
            <TextField
              className={classes.textField}
              color="secondary"
              id="standard-basic"
              label="Random Images"
              variant="filled"
              type="number"
              size="small"
              defaultValue={urlParams.count}
              onChange={handleRnadomImageNum}
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >

        {
          displayImages.length ? displayImages.map((element, index) => {
            if (index === 0) {
              return (
                <Grid key={index} item xs={12} s={12} m={6} lg={6} xlg={6}>
                  <Collapse in={podCheck}>
                    <NasaImage
                      explanation={element.explanation}
                      title={element.title}
                      url={element.url}
                      date={element.date}
                      hdurl={element.hdurl}
                    />
                  </Collapse>
                </Grid>
              );
            }
            else {
              return (
                <Grid key={index} item xs={12} s={12} m={6} lg={6} xlg={6}>
                  <NasaImage
                    explanation={element.explanation}
                    title={element.title}
                    url={element.url}
                    date={element.date}
                    hdurl={element.hdurl}
                  />
                </Grid>
              );
            }

          }) : <CircularProgress color="secondary"></CircularProgress>
        }
      </Grid>
    </div>
  );
}

export default App;
