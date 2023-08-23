import { Link } from "react-router-dom";
import "./Pokemon.css";
import React from "react";

const Pokemon = ({ name, url, id }) => {
  return (
    <Link className="pokemon" to={`/pokemon/${id}`}>
      <div className="pokemon-name">{name}</div>
      <div>
        <img className="pokemon-image" src={url} />
      </div>
    </Link>
  );
};

export default Pokemon;
