function getLocation(getLat, getLong) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      getLat(position.coords.latitude);
      getLong(position.coords.longitude);
    },
    function (err) {
      console.log(err);
    }
  );
}

export default getLocation;
