(function initMap() {
  const covid19Map = L.map('mapid').setView([40, 0], 2);

  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      minZoom: 2,
      maxZoom: 3,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        'pk.eyJ1Ijoic2FiaW1vZmxlciIsImEiOiJjazhjdDBzeXMwNDh1M21wZ29zbjIzNGh0In0.4QQx1ZiymWSokk2mFaL66w',
    }
  ).addTo(covid19Map);

  addCircles(covid19Map);
})();

function addCircles(map) {
  mapData.forEach((coords) => {
    L.circle([coords[0], coords[1]], {
      color: '#276749',
      fillColor: '#48bb78',
      fillOpacity: 0.5,
      radius: coords[2] / 8,
    }).addTo(map);
  });
}
