import React from "react";
import { Map, Marker } from "pigeon-maps";

const Ubications = ({ hotel }) => {
  return (
    <div className="map__ubication">
      <Map
        defaultCenter={[+hotel?.lat, +hotel?.lon]}
        zoom={15}
        maxZoom={16}
        minZoom={10}>
        <Marker
          anchor={[+hotel?.lat, +hotel?.lon]}
          width={40}
          color="blueviolet"
        />
      </Map>
    </div>
  );
};

export default Ubications;
