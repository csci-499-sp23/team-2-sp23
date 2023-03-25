// retrieves the user's current location
// To be replaced with some google api for better accuracy
async function getUserCoordinates() {
  const retrieveLocation = new Promise((resolve, reject) => {
    // Handle user allows location request
    function handleResolve(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      resolve({
        success: true,
        coordinates: { latitude, longitude },
      });
    }

    // Handle user denies location request
    function handleReject() {
      reject({
        success: false,
        message: "Failed to retrieve coordinates...",
      });
    }

    navigator.geolocation.getCurrentPosition(handleResolve, handleReject);
  });

  return retrieveLocation;
}

export default getUserCoordinates;
