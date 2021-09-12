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
      api_key: "EYNdwCv2ngW0Sf5h9ZUVICjuKhYNGNho47VOoZO6"
    };
    Object.keys(urlParams).forEach(key => url.searchParams.append(key, urlParams[key]));

    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    });

    const responseJSON = await response.json();
    console.log(responseJSON);

    return responseJSON;
  };

  React.useEffect(() => {
    getNasaImages();
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >

        <Grid item xs={12} s={12} m={6} lg={6} xlg={6}>
          <NasaImage></NasaImage>
        </Grid>
        <Grid item xs={12} s={12} m={6} lg={6} xlg={6}>
          <NasaImage></NasaImage>
        </Grid>
        
      </Grid>
    </div>
  );
}

export default App;
