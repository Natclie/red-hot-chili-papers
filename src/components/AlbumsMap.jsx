import React from "react";
import Albums from "/data/albums/albums.js";

const AlbumList = () => {
    return (
        <div className="w-full flex flex-wrap gap-1 justify-center">
            {Albums.map((album, index) => (
                <div key={index} className="w-[200px] m-5 flex flex-wrap">
                    <img className="w-64 mx-auto rounded-xl" src={album.img} alt={album.name} />
                    <p className="w-full text-center font-bold text-lg bg-gradient-to-r from-amber-600 to-fuchsia-700 bg-clip-text text-transparent">{album.name}</p>
                    <p className="w-full text-center">{album.date}</p>
                    <div className="flex w-full justify-center gap-4 ">
                        <a target="_blank" href={album.link_youtube}><i className="fa-brands fa-youtube scale-150 bg-gradient-to-r from-amber-500 to-fuchsia-600 bg-clip-text text-transparent"></i></a>
                        <a target="_blank" href={album.link_spotify}><i className="fa-brands fa-spotify scale-150 bg-gradient-to-r from-amber-500 to-fuchsia-600 bg-clip-text text-transparent"></i></a>
                        <a target="_blank" href={album.link_apple}><i className="fa-brands fa-apple scale-150 bg-gradient-to-r from-amber-500 to-fuchsia-600 bg-clip-text text-transparent"></i></a>
                        <a target="_blank" href={album.link_amazon}><i className="fa-brands fa-amazon scale-150 bg-gradient-to-r from-amber-500 to-fuchsia-600 bg-clip-text text-transparent"></i></a>
                    </div>
                </div>
            ))}
        </div>

    );
    
    
};

export default AlbumList;
