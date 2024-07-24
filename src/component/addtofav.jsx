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
      <div className="cate grid grid-cols-3 gap-3 m-4">
        {data &&
          data.categories.map((item) => (
            <div key={item.idCategory} className="flex flex-col items-center justify-center bg-gray-300">
              <img src={item.strCategoryThumb} alt="" />
              <h3>{item.strCategory}</h3>
              {fav.some(f => f.idCategory === item.idCategory) ? (
                <button
                  onClick={() =>
                    setFav(fav.filter((f) => f.idCategory !== item.idCategory))
                  }
                  className="btn h-14 w-40 rounded-md hover:bg-red-400 bg-red-700"
                >
                  Remove from Fav
                </button>
              ) : (
                <button
                  onClick={() => setFav([...fav, item])}
                  className="btn h-14 w-40 rounded-md hover:bg-green-400 bg-green-700"
                >
                  Add to Fav
                </button>
              )}
            </div>
          ))}
      </div>

      <h1 className="text-center text-6xl font-bold">Favorites</h1>
      

      <div className="favs parent grid grid-cols-3 gap-3">
        {fav && fav.length ? (
          fav.map((item) => (
            <div key={item.idCategory} className="flex flex-col items-center justify-center">
              <h3>{item.strCategory}</h3>
              <img src={item.strCategoryThumb} alt="" />
              
              <button
                onClick={() =>
                  setFav(fav.filter((f) => f.idCategory!== item.idCategory))
                }
                className="btn h-14 w-40 rounded-md hover:bg-red-400 bg-red-700"
              >
                Remove from Fav
              </button>
            </div>
          ))
        ) : (
          <span>Nothing To show</span>
        )}
      
      </div>
    </div>
  );
}
