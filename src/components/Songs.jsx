import { useState, useRef, useEffect } from "react";

import rotgcSongs from '/data/songs/rotgc.js';
import Albums from '/data/albums/albums.js';
import bloodSugarSexMagikSongs from '/data/songs/bsm.js';
import btwSongs from '/data/songs/btw.js';
import californicationSongs from '/data/songs/californication.js';
import freakyStyleySongs from '/data/songs/fs.js';
import greatestSongs from '/data/songs/greatesthits.js';
import imWithYouSongs from '/data/songs/iwy.js';
import mothersMilkSongs from '/data/songs/mm.js';
import OneHotMinuteSongs from '/data/songs/ohm.js';
import stadiumArcadiumSongs from '/data/songs/sa.js';
import theGetawaySongs from '/data/songs/tga.js';
import theRedHotChiliPeppersSongs from '/data/songs/trhc.js';
import theUpliftMofoPartyPlanSongs from '/data/songs/tumpp.js';

const allSongs = [
    ...rotgcSongs,
    ...bloodSugarSexMagikSongs,
    ...btwSongs,
    ...californicationSongs,
    ...freakyStyleySongs,
    ...imWithYouSongs,
    ...mothersMilkSongs,
    ...OneHotMinuteSongs,
    ...stadiumArcadiumSongs,
    ...theGetawaySongs,
    ...theRedHotChiliPeppersSongs,
    ...theUpliftMofoPartyPlanSongs
];

const MusicPlayer = () => {
    const [currentSongs, setCurrentSongs] = useState(rotgcSongs);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentAlbum, setCurrentAlbum] = useState(rotgcSongs);
    const [currentSong, setCurrentSong] = useState(rotgcSongs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const audioRef = useRef(null);
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    const handleAlbumClick = (albumName) => {
        const albumSongsMap = {
            "Return of the Dream Canteen": rotgcSongs,
            "The Uplift Mofo Party Plan": theUpliftMofoPartyPlanSongs,
            "One Hot Minute": OneHotMinuteSongs,
            "Blood Sugar Sex Magik": bloodSugarSexMagikSongs,
            "By the Way": btwSongs,
            "Californication": californicationSongs,
            "Freaky Styley": freakyStyleySongs,
            "Greatest Hits": greatestSongs,
            "I'm With You": imWithYouSongs,
            "Mother's Milk": mothersMilkSongs,
            "Stadium Arcadium": stadiumArcadiumSongs,
            "The Getaway": theGetawaySongs,
            "The Red Hot Chili Peppers": theRedHotChiliPeppersSongs
        };
    
        const albumData = Albums.find((album) => album.name === albumName);
    
        if (albumSongsMap[albumName]) {
            setCurrentSongs(albumSongsMap[albumName]); 
            setSelectedAlbum(albumData);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
            audioRef.current.volume = isMuted ? 0 : volume;
            if (isPlaying) {
                audioRef.current.play().catch((error) => console.error("Error al reproducir:", error));
            }
        }
    }, [currentSong]);

    useEffect(() => {
        const defaultAlbum = Albums.find(album => album.name === "Return of the Dream Canteen");
        if (defaultAlbum) {
            setSelectedAlbum(defaultAlbum);
            setCurrentAlbum(defaultAlbum);
        }
    }, []);
   
    const playSong = (song, index) => {
        if (currentSong !== song) {
            setCurrentSong(song);
            setCurrentIndex(index);
            setIsPlaying(true);
            setCurrentTime(0);
        }
    };

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch((error) => console.error("Error al reproducir:", error));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const nextSong = () => {
        let nextIndex = (currentIndex + 1) % currentSongs.length;
        playSong(currentSongs[nextIndex], nextIndex);
    };

    const prevSong = () => {
        let prevIndex = (currentIndex - 1 + currentSongs.length) % currentSongs.length;
        playSong(currentSongs[prevIndex], prevIndex);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (e) => {
        const newTime = parseFloat(e.target.value);
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? volume : 0;
        }
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const filteredSongs = searchTerm
        ? allSongs.filter(song =>
            song.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : currentSongs;

    {/* SONGS LIST*/ }
    return (
        <div className="p-1 h-screen w-screen flex flex-col">
            <header className="h-[9vh] bg-gray-900/50 rounded-xl mb-1">
                <div className="flex pt-[9px] items-center justify-center gap-3">
                    <div>
                        <a href="/">
                            <i className="fa-solid fa-house scale-150 text-white/90"></i>
                        </a>
                    </div>
                    {/*buscador */}
                    <div className="flex items-center justify-center border w-[60%] focus-within:border-white transition duration-300 pr-3 gap-2 border-white/50 h-[6vh] rounded-xl overflow-hidden">
                        <input
                            type="text"
                            placeholder="Search for songs"
                            className="w-full h-full pl-4 outline-none text-white placeholder-gray-500 text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="22"
                            height="22"
                            viewBox="0 0 30 30"
                            fill="#6B7280"
                        >
                            <path
                                d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
                            ></path>
                        </svg>
                    </div>
                </div>
            </header>
            <div className="flex flex-1 justify-between gap-1 w-full h-full">
                <div className="absolute w-full h-full top-0 left-0 -z-20">
                    {selectedAlbum && <img className="w-full h-screen object-cover" src={selectedAlbum.img} />}
                </div>
                <span className="absolute w-full h-full top-0 left-0 bg-black/50 backdrop-blur-sm -z-10"></span>
                
                { /* ALBUM LIST*/}
                <div className="flex flex-col gap-1">
                    
                    <div className="flex flex-col h-[75vh] overflow-x-hidden scrollbar-custom overflow-y-auto w-auto max-sm:w-[65px] max-w-[240px] flex-shrink-0 bg-gray-900/50 text-white rounded-xl gap-2 transition-all duration-300">
                        <div className="flex flex-col gap-3">
                            {Albums.map((album, index) => (
                                <div 
                                    key={index} 
                                    className="flex max-lg:w-2/3 min-w-[200px] items-center px-2 cursor-pointer" 
                                    onClick={() => handleAlbumClick(album.name)}
                                >
                                    <img className="w-16 rounded-md max-sm:w-12" src={album.img} alt={album.name} />
                                    <div className="p-2 max-lg:whitespace-nowrap whitespace-normal">
                                        <div className="max-sm:hidden">
                                            <h2 
                                                className="text-sm font-bold" 
                                                style={{ 
                                                    color: selectedAlbum?.name === album.name ? album.color : "inherit",
                                                    fontWeight: selectedAlbum?.name === album.name ? "bold" : "normal"
                                                }}
                                            >
                                                {album.name}
                                            </h2>
                                            <p>{album.year}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* SONG LIST */}
                <div className="flex flex-1 scrollbar-custom text-sm bg-gray-900/50 text-white rounded-xl flex-col gap-2 p-2 overflow-y-auto h-[75vh] w-full">
                {filteredSongs.map((song, index) => (
                <div 
                    key={index} 
                    className={`flex items-center justify-between w-full p-1 cursor-pointer transition duration-300 ${
                        currentSong.name === song.name ? "font-bold" : ""
                    }`}
                    style={{ 
                        color: currentSong.name === song.name && selectedAlbum ? selectedAlbum.color : "inherit",
                        fontWeight: currentSong.name === song.name ? "bold" : "normal"
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => playSong(song, index)}
                >
                    {/* numero + play imagen */}
                    <div className="flex items-center gap-3">
                        <div className="w-6 flex items-center justify-center relative max-sm:hidden">
                            {hoveredIndex === index ? (
                                <button 
                                    onClick={() => playSong(song, index)} 
                                    className="cursor-pointer hover:scale-110 duration-300 absolute"
                                >
                                    <i className="fa-solid fa-play scale-130"></i>
                                </button>
                            ) : (
                                <p className="text-md font-medium text-center">{index + 1}</p>
                            )}
                        </div>
                        <img src={song.img} alt={song.name} className="w-12 h-12 rounded-sm" />
                        <div className="flex flex-col min-w-0">
                            <h3 className="text-md font-semibold truncate">{song.name}</h3>
                            <span className="text-gray-300 text-left truncate">{song.album}</span>
                        </div>
                    </div>
                    {/* duracion */}
                    <span className="mx-4 max-sm:hidden flex items-center gap-1 min-w-[80px] text-gray-300">
                        <i className="fa-solid fa-clock"></i>
                        <p>{song.duration}</p>
                    </span>
                    {/* año */}
                    <span className="mx-4 max-sm:hidden min-w-[50px] text-gray-400 text-right">{song.year}</span>
                </div>
            ))}
    
                </div>
                {/* CURRENT ALBUM */}
                {selectedAlbum && (
                    <section className="bg-gray-900/50 max-xl:hidden rounded-lg shadow-md w-1/6 h-[75vh] flex flex-col items-center overflow-hidden text-white p-4 gap-3">
                        <img src={selectedAlbum.img} alt={selectedAlbum.name} className="w-64 object-cover rounded-t-lg" />
                        {/* nombre */}
                        <h2 className="text-xl font-bold text-center">{selectedAlbum.name}</h2>
                        {/*info */}
                        <div className="w-full flex flex-col gap-1 text-lg">
                            <div className="flex text-sm justify-between px-2">
                                <p>Tracks: {selectedAlbum.tracks}</p>
                                <p>{selectedAlbum.genre}</p>
                            </div>
                            <div className="flex text-sm justify-between px-2">
                                <p>{selectedAlbum.time}</p>
                            </div>
                        </div>
                        {/* desc */}
                        <p className="text-sm text-center p-2">{selectedAlbum.desc}</p>
                    </section>
                )}
                {/* BAR REPRODUCTOR */}
                <section className="absolute bottom-0 left-0 w-full bg-gray-900/50 text-white py-2 flex justify-center items-center px-5">
                    <div className="max-sm:hidden flex justify-between items-center w-full">
                        <div className="flex items-center gap-2">
                            <img src={currentSong.img} alt={currentSong.name} className="w-16 h-16 mx-auto rounded-lg" />
                            <div>
                                <h2 className="text-sm font-bold">{currentSong.name}</h2>
                                <h2 className="whitespace-nowrap overflow-hidden text-ellipsis">{currentSong.duration}</h2>
                            </div>
                        </div>
                        {/*controles */}
                        <div className="flex flex-col items-center gap-2 w-full">
                            <div className="flex items-center gap-10">
                                <button onClick={prevSong} className="max-sm:hidden text-2xl cursor-pointer">
                                    <i className="fa-solid fa-backward-step"></i>
                                </button>
                                <button onClick={togglePlayPause} className="text-2xl cursor-pointer">
                                    {isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
                                </button>
                                <button onClick={nextSong} className="max-sm:hidden text-2xl cursor-pointer">
                                    <i className="fa-solid fa-forward-step"></i>
                                </button>
                            </div>
                            {/* barra de progreso DESKTOP */}
                            <div className="flex items-center w-full gap-3 justify-center pt-1">
                            <input
                                type="range"
                                min="0"
                                max={duration}
                                value={currentTime}
                                onChange={handleSeek}
                                className="w-full h-1 appearance-none cursor-pointer bg-gray-700 rounded-lg
                                        [&::-webkit-slider-thumb]:opacity-0 
                                        [&::-moz-range-thumb]:opacity-0 
                                        [&::-ms-thumb]:opacity-0"
                                style={{
                                    background: `linear-gradient(to right, #1a1a1a ${(currentTime / duration) * 100}%, #4b5563 ${(currentTime / duration) * 100}%)`,
                                }}
                            />
    
                            </div>
                        </div>
                        {/*volumen */}
                        <div className="flex max-sm:hidden items-center gap-2">
                            {/*volumen btn */}
                            <button onClick={toggleMute} className="text-xl cursor-pointer">
                                {isMuted || volume === 0 ? (
                                    <i className="fa-solid fa-volume-xmark"></i>
                                ) : (
                                    <i className="fa-solid fa-volume-up"></i>
                                )}
                            </button>
                            {/*volumen input*/}
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-24 h-0.5 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                
                            />
                        </div>
                        <audio
                            ref={audioRef}
                            className="hidden"
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onEnded={nextSong}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        >
                            <source src={currentSong.song} type="audio/mpeg" />
                        </audio>
                    </div>
                {/*controles mobile */}
                    <section className="hidden max-sm:block">
                        <div className="w-screen px-2">
                            {/* image nombre boton y pausa */}
                            <div className="flex justify-between items-center gap-2">
                                {/* img y name */}
                                <div className="flex items-center gap-2">
                                    <img
                                        src={currentSong.img}
                                        alt={currentSong.name}
                                        className="w-15 h-15 rounded-lg"
                                    />
                                    <div>
                                        <h2 className="text-sm font-bold">{currentSong.name}</h2>
                                        <h2 className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
                                            {currentSong.album}
                                        </h2>
                                    </div>
                                </div>
                                {/* pausa */}
                                <button
                                    onClick={togglePlayPause}
                                    className="text-2xl cursor-pointer"
                                >
                                    {isPlaying ? (
                                        <i className="fa-solid fa-pause"></i>
                                    ) : (
                                        <i className="fa-solid fa-play"></i>
                                    )}
                                </button>
                            </div>
    
                            {/* barra de progreso mobile */}
                            <div className="flex items-center w-full gap-3 justify-center pt-1">
                            <input
                                type="range"
                                min="0"
                                max={duration}
                                value={currentTime}
                                onChange={handleSeek}
                                className="w-full h-1 appearance-none cursor-pointer bg-gray-500 rounded-lg
                                        [&::-webkit-slider-thumb]:opacity-0 
                                        [&::-moz-range-thumb]:opacity-0 
                                        [&::-ms-thumb]:opacity-0"
                                style={{
                                    background: `linear-gradient(to right, #1a1a1a ${(currentTime / duration) * 100}%, #374151 ${(currentTime / duration) * 100}%)`,
                                }}
                            />
    
                            </div>
    
                        </div>
                    </section>
    
                </section>
    
            </div>
        </div>
    );
};

export default MusicPlayer;