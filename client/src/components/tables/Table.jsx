import { useEffect, useState } from "react";
import Modal from "../utils/Modal";
import { BASE_API_URL } from "../../api/BaseURL";
import useToken from "../../hooks/useToken";

export default function Table() {
  const [isModal, setIsModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useToken();

  const [editProduct, setEditProduct] = useState({});

  const fetchProducts = async () => {
    setLoading(true);
    const response = await fetch(`${BASE_API_URL}/products`);
    const data = await response.json();
    console.log(data);
    setLoading(false);
    setProducts(data.data);
  };
  useEffect(() => {
    fetchProducts();
  }, [isModal]);

  const deleteProduct = async (id) => {
    const response = await fetch(`${BASE_API_URL}/products/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    fetchProducts();
    console.log(data, "Delete data");
  };

  // const editProduct = async (id) => {
  // const response = await fetch(`${BASE_API_URL}/products/delete/${id}`, {
  //   method: "DELETE",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  // const data = await response.json();
  // fetchProducts();
  // console.log(data, "Delete data");
  // };

  return (
    <>
      <div className="h-screen w-[70%] flex flex-col mx-auto">
        <div className="flex flex-row items-center p-1">
          <div className="text-xl font-medium ">ALl Products</div>
          <div
            className="w-fit bg-primaryGreen rounded text-white cursor-pointer p-2 ml-auto"
            onClick={() => setIsModal(true)}
          >
            Add Product
          </div>
        </div>

        <div className="w-full my-5">
          <table className="w-full shadow mx-auto mx-h-[70vh] overflow-y-auto">
            <thead className="bg-gray-300 bg-opacity-50 text-primaryGreen rounded-lg text-left">
              <tr>
                <th className="p-2">S No.</th>
                <th className="p-2">Product Name</th>
                <th className="p-2">Category</th>
                <th className="p-2">Unit Price</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody className="p-3">
              {!loading ? (
                products?.map((record, idx) => (
                  <tr key={record._id}>
                    <td className="p-2 border">{idx + 1}</td>
                    <td className="p-2 border">{record.productName}</td>
                    <td className="p-2 border">{record.category}</td>
                    <td className="p-2 border">Rs {record.price}</td>
                    <td className="p-2 border flex">
                      <button
                        className="text-gray-500 mr-3 flex flex-row items-center"
                        onClick={() => {
                          setEditProduct(record);
                          setIsModal(true);
                          setIsEditing(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        className="text-red-500 flex flex-row items-center"
                        onClick={() => deleteProduct(record._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isModal && <Modal setIsModal={setIsModal} />}
      {isEditing && (
        <Modal
          setIsModal={setIsModal}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          product={editProduct}
        />
      )}
    </>
  );
}
