const HeaderCard = () => {
    return (
        <div>
            <div className="relative bottom-36 flex gap-6 justify-center items-center font-sourceSans3">
                <div className="p-12 bg-white rounded-xl text-center shadow-xl">
                        <h3 className="font-bold text-7xl hover:text-[#07332F] text-[#F7A582] mb-1">73%</h3>
                    <p className="text-gray-500 font-bold">DOGS ARE FIRST BRED</p>
                </div>

                <div className="p-12 bg-white rounded-xl text-center shadow-xl">
                        <h3 className="font-bold text-7xl hover:text-[#07332F] text-[#F7A582] mb-1">259+</h3>
                    <p className="text-gray-500 font-bold">MOST DOGS ARE FIRST</p>
                </div>

                <div className="p-12 bg-white rounded-xl text-center shadow-xl">
                        <h3 className="font-bold text-7xl hover:text-[#07332F] text-[#F7A582] mb-1">39K</h3>
                    <p className="text-gray-500 font-bold">DOG BREEDING</p>
                </div>

                <div className="p-12 bg-white rounded-xl text-center shadow-xl">
                        <h3 className="font-bold text-7xl hover:text-[#07332F] text-[#F7A582] mb-1">45+</h3>
                    <p className="text-gray-500 font-bold">YEARS OF HISTORY</p>
                </div>
            </div>
        </div>
    );
};

export default HeaderCard;