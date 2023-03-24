async function getLocation() {
  const getPosition = new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      resolve({
        latitude,
        longitude,
      });
    });
  });

  return await getPosition;
}

export default getLocation;
