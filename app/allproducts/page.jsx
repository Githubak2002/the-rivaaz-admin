// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useIsAdmin } from '@/hooks/useCheckAdmin';
// import { get } from 'mongoose';
// import axios from 'axios';

// const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

// const Page = () => {

//   const isAdmin = useIsAdmin();
//   const [isUserAdmin, setIsUserAdmin] = useState(false);
//   const [allProducts,setAllProducts] = useState({});

//   const router = useRouter();

//   useEffect(() => {
//     setIsUserAdmin(isAdmin);
//     if (!isAdmin) {
//       router.push('/');
//     }
//   }, [router]);

//   useEffect(() => {
//     const getAllProducts = async ()  => {
//       const res = await axios.get(`${backend_url}/api/allproducts`);
//       setAllProducts(res.data);
//       console.log("all products → ",res.data);
//     }
//     getAllProducts();
//   },[])


  
//   if (!isUserAdmin) {
//     return <section className="flexCenter h-[80vh]">Access Denied.</section>; 
//   }

//   return (
//     <section className="min-h-[80vh] flexCenter">
//       <h2 className="text-center py-8">All products</h2>
//     </section>
//   );
// };

// export default Page;


'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useIsAdmin } from '@/hooks/useCheckAdmin';
import axios from 'axios';

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const Page = () => {
  const isAdmin = useIsAdmin();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    setIsUserAdmin(isAdmin);
    if (!isAdmin) {
      router.push('/');
    }
  }, [router, isAdmin]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get(`${backend_url}/api/allproducts`);
        setAllProducts(res.data.allProducts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getAllProducts();
  }, []);

  if (!isUserAdmin) {
    return <section className="flexCenter h-[80vh]">Access Denied.</section>;
  }

  if (loading) return <section className="flexCenter h-[80vh]">Loading...</section>;
  if (error) return <section className="flexCenter h-[80vh]">Error: {error}</section>;

  return (
    <section className="min-h-[80vh] p-8">
      <h2 className="text-center py-8 text-2xl font-bold">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <div key={product._id} className="border rounded-lg overflow-hidden shadow-lg">
            <div className="relative">
              {product.image.length > 0 && (
                <img
                  src={product.image[0]} // Displaying the first image
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              ₹ {product.price}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{product.description}</p>
              {/* ==== all images ==== */}
              <div className="mt-4">
                {product.image.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.title} image ${index + 1}`}
                    className="w-20 h-20 object-cover mr-2"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;
