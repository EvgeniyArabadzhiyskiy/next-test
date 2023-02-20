import axios from "axios";
import { useState, useEffect } from "react";
import GalleryList from "@/components/GalleryList/GalleryList";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "26298929-dc8db63efad38f2c4177a32d6";
const OPTIONS = "image_type=photo";

async function fetchImages(query, page) {
  const response = await axios(
    `${BASE_URL}?key=${API_KEY}&q=${query}&${OPTIONS}&page=${page}&per_page=12`
  );

  return response.data;
}

export const getServerSideProps = async (context) => {
  const { query = "car", page = 1 } = context.query;

  const data = await fetchImages(query, page);

  return {
    props: {
      images: data,
      query,
      page: parseInt(page),
    },
  };
};

function PixabayPage({
  page: initialPage,
  query: initialQuery,
  images: initialData,
}) {
  const [page, setPage] = useState(initialPage);
  const [query, setQuery] = useState(initialQuery);
  const [images, setData] = useState(initialData);

  useEffect(() => {
    if (query === "") return;

    (async () => {
      const images = await fetchImages(query, page);
      setData(images);
    })();
  }, [page, query]);

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    const inputValue = e.currentTarget.elements.query.value;

    setQuery(inputValue);
    setPage(1);
  };

  const onNextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <form onSubmit={onSearchSubmit}>
        <input type="text" name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      {images && <GalleryList hitsList={images.hits} />}

      {images && (
        <button type="button" onClick={onNextPage}>
          Next Page
        </button>
      )}
    </div>
  );
}

export default PixabayPage;

//====================================================================

// import Link from "next/link";
// import Router from "next/router";
// import { useState, useEffect } from "react";

// import GalleryList from "@/components/GalleryList/GalleryList";
// import axios from "axios";

// const BASE_URL = "https://pixabay.com/api/";
// const API_KEY = "26298929-dc8db63efad38f2c4177a32d6";
// const OPTIONS = "image_type=photo";

// async function fetchImages(query, page) {
//   const response = await axios(
//     `${BASE_URL}?key=${API_KEY}&q=${query}&${OPTIONS}&page=${page}&per_page=12`
//   );

//   return response.data;
// }

// export const getServerSideProps = async (context) => {
//   const { query = "", page = 1 } = context.query;

//   const data = await fetchImages(query, page);

//   return {
//     props: {
//       images: data,
//       query,
//       page: parseInt(page),
//     },
//   };
// };

// const PixabayPage = ({ images, query: initialQuery, page: initialPage }) => {
//   const [page, setPage] = useState(initialPage);
//   const [query, setQuery] = useState(initialQuery);

//   useEffect(() => {
//     Router.push(`/pixabay?query=${query}&page=${page}`);
//   }, [page, query]);

//   const onNextPage = () => {
//     setPage((prev) => prev + 1);
//   };

//   const onSearchSubmit = async (e) => {
//     e.preventDefault();
//     const inputValue = e.currentTarget.elements.query.value;

//     setQuery(inputValue);
//     setPage(1);
//   };

//   return (
//     <>
//       <Link href="/">GO HOME</Link>
//       <h1>Images List</h1>

//       <form onSubmit={onSearchSubmit}>
//         <input type="text" name="query" defaultValue={query} />

//         <button type="submit">Search</button>
//       </form>

//       {images && <GalleryList hitsList={images.hits} />}

//       {images && (
//         <button type="button" onClick={onNextPage}>
//           Next Page
//         </button>
//       )}
//     </>
//   );
// };

// export default PixabayPage;

//===================================================================


//==============================================================

// import Link from "next/link";
// import { useState } from "react";
// import axios from "axios";

// import GalleryList from "@/components/GalleryList/GalleryList";
// import { useEffect } from "react";

// const BASE_URL = "https://pixabay.com/api/";
// const API_KEY = "26298929-dc8db63efad38f2c4177a32d6";
// const OPTIONS = "image_type=photo";

// async function fetchImages(query, page) {
//   const response = await axios(
//     `${BASE_URL}?key=${API_KEY}&q=${query}&${OPTIONS}&page=${page}&per_page=12`
//   );

//   return response.data.hits;
// }

// export async function getServerSideProps({ query: { query = 'dog', page = 1 } }) {
//   const images = await fetchImages(query, page)

//   return {
//     props: {
//       initialImages: images,
//     },
//   };
// }

// const PixabayPage = ({ initialImages }) => {
// const [query, setQuery] = useState("");
// const [page, setPage] = useState(1);
//   const [images, setImages] = useState(initialImages);

//   useEffect(() => {
//     if (query === "") return;

//     (async () => {
//       const images = await fetchImages(query, page)
//       setImages((prev) =>  [...prev,  ...images]);
//     })()
//   },[page, query])

//   const onSearchSubmit = async (e) => {
//     e.preventDefault();
//     const inputValue = e.currentTarget.elements.query.value;

//     setQuery(inputValue);
//     setPage(1);
//     setImages([])
//   };

//   const onNextPege = () => {
//     setPage((prev) => prev + 1);
//   };

//   return (
//     <>
//       <Link href="/">GO HOME</Link>
//       <h1>Images List</h1>

//       <form onSubmit={onSearchSubmit}>
//         <input type="text" name="query" />

//         <button type="submit">Search</button>
//       </form>

//       {images && <GalleryList hitsList={images} />}

//       {images && (
//         <button type="button" onClick={onNextPege}>
//           Next Page
//         </button>
//       )}
//     </>
//   );
// };

// export default PixabayPage;

//======================================================================
