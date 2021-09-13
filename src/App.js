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

const useStyles = makeStyles((theme) => {
  return (
    {
      root: {
        flexGrow: 1,
      },

      navBar: {
        background: "#222629",
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
    const urlParams = {
      count: "2",
    };
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
  }, []);

  React.useEffect(() => {
    setDisplayImages([...picOfDay, ...nasaImages]);
  }, [picOfDay, nasaImages, podCheck]);

  const handlePodCheck = () => {
    setPodCheck(!podCheck);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <AppBar position="fixed" className={classes.navBar}>
            <Toolbar variant="dense">
              <Grid
                container
                spacing={0}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} s={12} m={6} lg={6} xlg={6}>
                  <Typography variant="h6" color="inherit">
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
                  </FormGroup>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Toolbar />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={4}
        direction="column"
        justifyContent="center"
        alignItems="center"
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
                    />
                  </Collapse>
                </Grid>

              );
            } else {
              return (
                <Grid key={index} item xs={12} s={12} m={6} lg={6} xlg={6}>
                  <NasaImage
                    explanation={element.explanation}
                    title={element.title}
                    url={element.url}
                  />
                </Grid>
              );
            }

          }) : <h1>Loading</h1>
        }
      </Grid>
    </div>
  );
}

export default App;
