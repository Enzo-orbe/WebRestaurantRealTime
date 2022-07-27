import React, { useContext, useRef } from "react";
import { firebaseContext } from "../../firebase";

const Plato = ({ plato }) => {
  const {
    id,
    nombre,
    precio,
    categoria,
    extistencia,
    imagen,
    descripcion,
  } = plato;

  const extistenciaRef = useRef(extistencia);
  const { firebase } = useContext(firebaseContext);

  const actualizarStock = () => {
    const existencia = extistenciaRef.current.value === "true";

    try {
      firebase.db
        .collection("productos")
        .doc(id)
        .update({
          extistencia: existencia,
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full px-3 mb-4">
      <div className="p-5 shadow-md bg-white">
        <div className="lg:flex">
          <div className="lg:w-5/12 xl:w-3/12">
            <img src={imagen} alt="Imagen del Plato" />
            <div className="sm:flex sm:-mx-2 pl-2">
              <label className="block mt-5 sm:w-2/4">
                <span className="block text-gray-800 mb-2">En Stock</span>
                <select
                  value={extistencia}
                  ref={extistenciaRef}
                  onChange={() => actualizarStock()}
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus: outline-none focus:shadow-outline"
                >
                  <option value="true">Disponible</option>
                  <option value="false">No Disponible</option>
                </select>
              </label>
            </div>
          </div>
          <div className="lg:w-7/12 xl:w-9/12 pl-5">
            <p className="font-bold text-2xl text-yellow-600 mb-4">{nombre}</p>
            <p className="text-gray-600 mb-4">
              Categoria:{" "}
              <span className="text-gray-700 font-bold">
                {categoria.toUpperCase()}
              </span>{" "}
            </p>
            <p className="text-gray-600 mb-4">{descripcion}</p>
            <p className="text-gray-600 mb-4">
              Precio: <span className="text-gray-700 font-bold">${precio}</span>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plato;
