const rhcpItems = [
    {
        img: "/cd-t-shirt-box-set-home.png",
        name: "cd t shirt box set home"
    },
    {
        img: "/baby-pink-vinyl-set-home.png",
        name: "baby pink vinyl set home"
    },
    {
        img: "/indie-gold-alt-cover-home.png",
        name: "indie gold alt cover home"
    }
]

const rhcp = () => {
    return (
        <div className="flex gap-5 flex-wrap justify-center items-center">
            {rhcpItems.map((items) => (
                <img className="w-70 object-cover" src={items.img} alt={items.name} />
            ))}
        </div>
    )
}

export default rhcp