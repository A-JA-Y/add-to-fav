import React, { useEffect, useState } from "react";

export default function Addtofav() {
  const [data, setData] = useState(null);
  const [fav, setFav] = useState(() => {
    const savedFavs = localStorage.getItem("favorites");
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(fav));
  }, [fav]);

  return (
    <div>
    <h1 className="text-6xl font-bold text-center">Add To Favorites</h1>
      <div className="cate grid lg:grid-cols-3 sm:grid-cols-1 gap-3 m-4 ">
        {data &&
          data.categories.map((item) => (
            <div key={item.idCategory} className="flex flex-col items-center justify-center bg-gray-300 p-4 rounded-lg hover:cursor-pointer">
              <img src={item.strCategoryThumb} alt=""  className=" rounded-md hover:scale-110 transition-transform "/>
              <h3 className="text-2xl font-serif hover:italic">{item.strCategory}</h3>
              {fav.some(f => f.idCategory === item.idCategory) ? (
                <button
                  onClick={() =>
                    setFav(fav.filter((f) => f.idCategory !== item.idCategory))
                  }
                  className="btn h-12 w-36 rounded-md hover:bg-red-600 bg-red-700  m-2 hover:text-white hover:scale-110 hover:font-medium transition-all"
                >
                  Remove from Fav
                </button>
              ) : (
                <button
                  onClick={() => setFav([...fav, item])}
                  className="btn h-12 w-36 rounded-md hover:bg-green-400 bg-green-700 m-2 hover:text-white hover:scale-110 hover:font-medium transition-all"
                >
                  Add to Fav
                </button>
              )}
            </div>
          ))}
      </div>

      <h1 className="text-center text-6xl font-bold">Favorites</h1>
      

      <div className="favs parent grid lg:grid-cols-3 sm:grid-cols-1 gap-3 m-4">
        {fav && fav.length ? (
          fav.map((item) => (
            <div key={item.idCategory} className="flex flex-col items-center justify-center bg-gray-300  rounded-xl ">
              <h3 className="text-2xl font-serif hover:italic">{item.strCategory}</h3>
              <img src={item.strCategoryThumb} alt="" />
              
              <button
                onClick={() =>
                  setFav(fav.filter((f) => f.idCategory!== item.idCategory))
                }
                className="btn h-12 w-36 rounded-md hover:bg-red-600 bg-red-700  hover:text-white hover:scale-110 hover:font-medium transition-all m-2"
              >
                Remove from Fav
              </button>
            </div>
          ))
        ) : (
          <h4 className="text-3xl font-medium italic text-center w-full">Nothing To show !</h4>
        )}
      
      </div>
    </div>
  );
}
