
function Footer() {
    return (
        <>
            <footer className="footer px-10 pt-5 bg-black bg-opacity-100 lg:bg-opacity-80 text-base-content border-base-300 mt-0">
                <p className="flex">Questions? Call <span className="hover:underline hover:cursor-pointer">1-844-505-2993</span></p>
            </footer>
            <footer className="footer p-10 bg-black bg-opacity-100 lg:bg-opacity-80 text-base-content">
                <div>
                    <a href="" target="_blank" className="link link-hover">FAQ</a>
                    <a href="" target="_blank" className="link link-hover">Privacy</a>
                </div>
                <div>
                    <a href="" target="_blank" className="link link-hover">Help Center</a>
                    <a href="" target="_blank" className="link link-hover">Cookie Preferences</a>
                </div>
                <div>
                    <a href="" target="_blank" className="link link-hover">Netflix Shop</a>
                    <a href="" target="_blank" className="link link-hover">Corporate Information</a>
                </div>
                <div>
                    <a href="" target="_blank" className="link link-hover">Netflix Shop</a>
                    <a href="" target="_blank" className="link link-hover">Corporate Information</a>
                </div>
            </footer>
            <footer className="footer px-10 py-4 pb-20 bg-black bg-opacity-100 lg:bg-opacity-80 text-base-content border-base-300">
                <div className="items-center grid-flow-col">
                    <select className="bg-black select select-bordered select-lg w-full max-w-xs">
                        <option value="English" >🌐 English</option>
                        <option value="Español">Español</option>
                    </select>
                </div>
            </footer>
        </>
    )
}

export default Footer