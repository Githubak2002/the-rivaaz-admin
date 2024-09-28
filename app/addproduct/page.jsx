'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useIsAdmin } from '@/hooks/useCheckAdmin';
import { CldUploadWidget } from 'next-cloudinary';
import toast from 'react-hot-toast';
import axios from 'axios';

const Page = () => {

  const isAdmin = useIsAdmin();
  
  const [resource, setResource] = useState(null);
  const [imgs, setImgs] = useState([]);
  const [productDetails, setProductDetails] = useState({
    // title: "oo",
    // description: "details",
    // price: "99",
    // previousPrice:"199",
    // category: "oo",
    // stock: "9",
    title: "",
    description: "",
    price: "",
    previousPrice:"",
    category: "",
    stock: "",
  });
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  // const [folderName, setFolderName] = useState(""); 


  const router = useRouter();

  useEffect(() => {
    setIsUserAdmin(isAdmin);
    if (!isAdmin) {
      router.push('/');
    }
  }, [router]);

  // useEffect(() => {
  //   setFolderName(productDetails.title);
  // }, [productDetails.title]);

  if (!isUserAdmin) {
    return <section className="flexCenter h-[80vh]">Access Denied.</section>;
  }

  const handleSuccess = (result) => {
    setResource(result?.info); // { public_id, secure_url, etc }
    setImgs((prevImgs) => [...prevImgs, result.info]);
  };

  const handleQueuesEnd = () => {
    console.log("All uploads complete. Images:", imgs);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare form data
    const productData = {
      title: productDetails.title,
      price: productDetails.price,
      previousPrice: productDetails.previousPrice,
      description: productDetails.description,
      category: productDetails.category,
      stock: productDetails.stock,
      image: imgs.map(img => img.secure_url), 
    };
  
    try {
      const response = await axios.post('/api/addproduct', productData);
      if (response.data.result) {
        // console.log("Product added successfully! ", response.data);
        toast.success("Product added successfully! ");
        setProductDetails({
          title: '',
          description: '',
          price: '',
          previousPrice: '',
          category: '',
          stock: '',
        });
        setImgs([]);
      } else {
        console.error("Error adding product", response.data.error);
        toast.error("Error adding product",response.data.error);
      }
    } catch (error) {
      console.error('Error submitting form → ', error.response?.data || error.message);
      toast.error("Error submitting form")
    }
  };

  return (
    <section className="min-h-[80vh] flexCenter flex-col gap-y-6">
      <h2 className="text-center py-8">Add New Product</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full max-w-lg">
        <div>
          <input
            type="text"
            id="title"
            name="title"
            value={productDetails.title}
            onChange={handleInputChange}
            placeholder="Product Title"
            required
            className="mt-1 p-2 border border-gray-300 rounded"
          />
          <textarea
            id="description"
            name="description"
            value={productDetails.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
            rows="4"
            className="mt-1 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            id="price"
            name="price"
            value={productDetails.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
            className="mt-1 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            id="previousPrice"
            name="previousPrice"
            value={productDetails.previousPrice}
            onChange={handleInputChange}
            placeholder="Previous Price"
            className="mt-1 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            id="category"
            name="category"
            value={productDetails.category}
            onChange={handleInputChange}
            placeholder="Category"
            required
            className="mt-1 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            id="stock"
            name="stock"
            value={productDetails.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            required
            className="mt-1 p-2 border border-gray-300 rounded"
          />
        </div>


        {/* {setImgFolder(productDetails.title)} */}

        <CldUploadWidget
          // uploadPreset='new_preset'
          signatureEndpoint="/api/uploadimg"
          options={{
            sources: ['local', 'url', 'unsplash'],
            folder: productDetails.title,
            // multiple: true,

          }}
          onSuccess={handleSuccess}
          onQueuesEnd={handleQueuesEnd}
        >
          {({ open }) => {
            function handleOnClick() {
              // console.log("folderName → ",folderName)
              // console.log("productDetails.title → ",productDetails.title)
              // setFolderName(productDetails.title);
              open();
            }
            return (
              <button
                type="button"
                className="mt-6 p-2 rounded-lg border border-black w-fit"
                onClick={handleOnClick}
              >
                Add Images
              </button>
            );
          }}
        </CldUploadWidget>

        <button
          type="submit"
          className="mt-6 p-2 rounded-lg bg-green-500 text-white"
        >
          Submit Product
        </button>
      </form>
    </section>
  );
};

export default Page;
