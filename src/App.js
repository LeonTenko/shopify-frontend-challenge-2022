import logo from './logo.svg';
import './App.css';
import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import NasaImage from './components/nasa_image/NasaImage';

const useStyles = makeStyles((theme) => {
  return (
    {
      root: {
        flexGrow: 1,
      },
    }
  );
});

function App() {
  const classes = useStyles();

  const [nasaImages, setNasaImages] = React.useState([]);

  const getNasaImages = async () => {

    // Refactor into a separate file later
    const url = new URL("https://api.nasa.gov/planetary/apod");
    const urlParams = {
      api_key: "EYNdwCv2ngW0Sf5h9ZUVICjuKhYNGNho47VOoZO6",
      count: "2"
    };
    Object.keys(urlParams).forEach(key => url.searchParams.append(key, urlParams[key]));

    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    });

    let responseJSON = await response.json();

    // Make it into an array of 1 if it's not by default.
    if (!Array.isArray(responseJSON)) {
      responseJSON = [responseJSON];
    }

    setNasaImages(responseJSON);
  };

  // Populate with default settings once as the page loads.
  React.useEffect(() => {
    getNasaImages();
  }, []);

  // Call every time nasaImages changes.
  React.useEffect(() => {
    console.log(nasaImages);
  }, [nasaImages])

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >

        {
          nasaImages.length ? nasaImages.map((element, index) => {
            return (
              <Grid key={index} item xs={12} s={12} m={6} lg={6} xlg={6}>
                <NasaImage
                  explanation={element.explanation}
                  title={element.title}
                  url={element.url}
                />
              </Grid>
            );
          }) : <h1>Loading</h1>
        }



      </Grid>
    </div>
  );
}

export default App;
