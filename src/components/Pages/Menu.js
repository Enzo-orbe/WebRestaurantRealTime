import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firebaseContext } from "../../firebase";
import Plato from "../ui/Plato";

const Menu = () => {
  const { firebase } = useContext(firebaseContext);
  const [platosMenu, setPlatosMenu] = useState([]);

  useEffect(() => {
    const obtenerPlatos = () => {
      firebase.db.collection("productos").onSnapshot(handleSnapshot);
    };
    obtenerPlatos();
  }, []);

  //real time db
  const handleSnapshot = (snapshot) => {
    const platos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setPlatosMenu(platos);
  };

  return (
    <div>
      <h1 className="text-3xl font-light mb-4">Desde Menu</h1>
      <Link
        to="/nuevo-platillo"
        className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold"
      >
        Agregar Platillo
      </Link>
      {platosMenu.map((plato) => (
        <Plato key={plato.id} plato={plato} />
      ))}
    </div>
  );
};

export default Menu;
