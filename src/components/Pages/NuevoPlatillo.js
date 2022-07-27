import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { firebaseContext } from "../../firebase";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";

const NuevoPlatillo = () => {
  const { firebase } = useContext(firebaseContext);
  const navigate = useNavigate();
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [urlImg, setUrlImg] = useState("");

  const formik = useFormik({
    initialValues: {
      nombre: "",
      precio: "",
      categoria: "",
      imagen: "",
      descripcion: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, "Los nombre deben tener al menos 3 caracteres")
        .required("El nombre es obligatorio."),
      precio: Yup.number()
        .min(1, "Debes agregar un precio")
        .required("El precio es obligatorio."),
      categoria: Yup.string().required("La categoria es obligatoria."),
      descripcion: Yup.string()
        .min(10, "La descripcion debe tener al menos 10 caracteres")
        .required("La descripcion es obligatoria."),
    }),
    onSubmit: (datos) => {
      try {
        datos.extistencia = true;
        datos.imagen = urlImg;
        firebase.db.collection("productos").add(datos);
        navigate("/menu");
      } catch (error) {
        console.log(error);
      }
    },
  });

  //Imagenes
  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  };
  const handleUploadError = (error) => {
    setSubiendo(false);
  };
  const handleUploadSuccess = async (nombre) => {
    setProgreso(100);
    setSubiendo(false);

    //guardar Url
    const url = await firebase.storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL();
    setUrlImg(url);
  };
  const handleProgress = (progreso) => {
    setProgreso(progreso);
  };

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Agregar Plato</h1>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Nombre del Plato"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 tex-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {formik.touched.nombre && formik.errors.nombre ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Hubo un error</p>
                <p>{formik.errors.nombre}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="precio"
              >
                Precio
              </label>
              <input
                id="precio"
                type="number"
                placeholder="$40"
                min="0"
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 tex-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {formik.touched.precio && formik.errors.precio ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Hubo un error</p>
                <p>{formik.errors.precio}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="categoria"
              >
                Categoria
              </label>
              <select
                id="categoria"
                name="categoria"
                value={formik.values.categoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 tex-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">-----Seleccione-----</option>
                <option value="Desayuno">Desayuno</option>
                <option value="Comida">Comida</option>
                <option value="Cena">Cena</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Postre">Postre</option>
                <option value="Ensalada">Ensalada</option>
              </select>
            </div>
            {formik.touched.categoria && formik.errors.categoria ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Hubo un error</p>
                <p>{formik.errors.categoria}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="imagen"
              >
                Imagen
              </label>
              <FileUploader
                accept="image/*"
                id="imagen"
                name="imagen"
                randomizeFilename
                storageRef={firebase.storage.ref("productos")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
            </div>
            {subiendo && (
              <div className="h-12 relative w-full border">
                <div
                  className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center"
                  style={{ width: `${progreso}%` }}
                >
                  {progreso} %
                </div>
              </div>
            )}

            {urlImg && (
              <p className="bg-green-500 text-white p-3 text-center my-5">
                La imagen se subio correctamente
              </p>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="descripcion"
              >
                Descripcion
              </label>
              <textarea
                id="descripcion"
                placeholder="Descripcion del Plato"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 tex-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
              ></textarea>
            </div>
            {formik.touched.descripcion && formik.errors.descripcion ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Hubo un error</p>
                <p>{formik.errors.descripcion}</p>
              </div>
            ) : null}
            <input
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-center text-white font-bold uppercase"
              value="Agregar Platillo"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default NuevoPlatillo;
