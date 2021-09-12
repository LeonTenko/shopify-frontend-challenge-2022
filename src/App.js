import logo from './logo.svg';
import './App.css';
import React from 'react';

import NasaImage from './components/nasa_image/NasaImage';

function App() {

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

  React.useEffect( () => {
    getNasaImages();
  }, []);

  return (
    <div className="App">
      <NasaImage></NasaImage>
    </div>
  );
}

export default App;
