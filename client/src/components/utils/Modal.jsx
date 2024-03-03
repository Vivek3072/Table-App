import { useState } from "react";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import { BASE_API_URL } from "../../api/BaseURL";
import useToken from "../../hooks/useToken";
import Toast from "./Toast";

export default function Modal({
  setIsModal,
  isEditing,
  setIsEditing,
  product,
}) {
  const [productName, setProductName] = useState(
    isEditing ? product.productName : ""
  );
  const [category, setCategory] = useState(isEditing ? product.category : "");
  const [price, setPrice] = useState(isEditing ? product.price : "");
  const [error, setError] = useState("");

  const [toast, setToast] = useState(false);

  const { token } = useToken();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(category, "category");
    // Validate product name
    if (!productName) {
      setError("Product name is required.");
    }
    if (!category) {
      setError("Category is required.");
    }
    if (!price) {
      setError("Price is required.");
    }

    try {
      const response = await fetch(`${BASE_API_URL}/products/add`, {
        method: "POST",
        body: JSON.stringify({
          productName: productName,
          category: category,
          price: price,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        setToast(true);
        console.log(data);
        return;
      }

      const data = await response.json();
      if (data.success) setIsModal(false);
      console.log(data, "POST data");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateProduct = async (id) => {
    try {
      const response = await fetch(`${BASE_API_URL}/products/update/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          productName: productName,
          category: category,
          price: price,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        return;
      }

      const data = await response.json();
      if (data.success) setIsModal(false);
      console.log(data, "POST data");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div className="fixed top-0 bg-black h-screen w-full flex items-center justify-center bg-opacity-30">
        <div className="bg-white h-[60vh] w-[70%] p-3 rounded-lg shadow">
          <div
            className="bg-primary cursor-pointer w-fit rounded-full px-3 py-2 text-white ml-auto"
            onClick={() => {
              setIsModal(false);
              setIsEditing(false);
            }}
          >
            Close
          </div>
          <>
            <form>
              <TextInput
                type="text"
                placeholder="Enter your product name"
                label="Product Name"
                inputValue={productName}
                setInputValue={setProductName}
              />
              <SelectInput
                type="text"
                label="Select your category"
                inputVal={category}
                inputValues={[
                  "Electronics",
                  "Fashion",
                  "Accessories",
                  "Grocery",
                ]}
                setValue={setCategory}
              />
              <TextInput
                type="number"
                placeholder="Enter your price"
                label="Price"
                inputValue={price}
                setInputValue={setPrice}
              />
            </form>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {!isEditing ? (
              <button
                type="submit"
                className="bg-primaryGreen rounded-lg px-4 py-2 w-fit text-white mx-auto my-3 cursor-pointer"
                onClick={handleSubmit}
              >
                Add Product
              </button>
            ) : (
              <button
                type="submit"
                className="bg-primaryGreen rounded-lg px-4 py-2 w-fit text-white mx-auto my-3 cursor-pointer"
                onClick={() => {
                  updateProduct(product._id);
                }}
              >
                Update Product
              </button>
            )}
          </>
        </div>
      </div>
      {toast && <Toast message="Succesfully done!" type="success" />}
    </>
  );
}
