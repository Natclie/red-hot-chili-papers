const Media = [
    {
        media: "Facebook",
        icon_class: "fa-brands fa-facebook-f",
        link: "https://www.facebook.com/ChiliPeppers/"
    },
    {
        media: "Twitter",
        icon_class: "fa-brands fa-twitter",
        link: "https://x.com/chilipeppers"
    },
    {
        media: "Instagram",
        icon_class: "fa-brands fa-instagram",
        link: "https://www.instagram.com/chilipeppers/"
    },
    {
        media: "Spotify",
        icon_class: "fa-brands fa-spotify",
        link: "https://open.spotify.com/intl-es/artist/0L8ExT028jH3ddEcZwqJJ5"
    },
    {
        media: "Apple Music",
        icon_class: "fa-brands fa-apple",
        link: "https://music.apple.com/us/artist/red-hot-chili-peppers/889780"
    },
    {
        media: "Youtube",
        icon_class: "fa-brands fa-youtube",
        link: "https://www.youtube.com/c/RedHotChiliPeppers"
    },
    {
        media: "Soundcloud",
        icon_class: "fa-brands fa-soundcloud",
        link: "https://soundcloud.com/red-hot-chili-peppers-official"
    }
]

const MediaBtn = () => {
    return (
        <div className="flex flex-col items-center gap-5 px-5">
            <div className="flex gap-2 scale-[2.3]">
                {Media.map((medias, index) =>(
                    <a className="bg-gradient-to-r from-amber-500 to-fuchsia-600 bg-clip-text text-transparent" target="_blank" href={medias.link}>
                        <i className={medias.icon_class}></i>
                    </a>
                ))}
            </div>
        </div>
    )
}
export default MediaBtn