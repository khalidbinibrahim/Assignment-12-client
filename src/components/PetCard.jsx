import { Fade } from 'react-awesome-reveal';
import { IoMdTime } from 'react-icons/io';
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { NavLink } from 'react-router-dom';

const PetCard = ({ pet }) => {
  return (
    <Fade>
      <div className="border-2 border-gray-300 rounded-xl font-sourceSans3">
        <div className="p-6">
          <div className="mb-4">
            <img className="rounded-xl h-48 w-80" src={pet?.petImage || "https://images.unsplash.com/photo-1622396090075-ab6b8396fe9b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />
          </div>

          <div className="mb-4 text-center">
            <h3 className="font-bebasNeue text-2xl text-[#3B3A3A] font-bold">{pet?.petName}</h3>
            <p className="text-[#6C6B6B] font-poppins font-normal text-xl">{pet?.petCategory}</p>
          </div>

          <div className="divider mx-auto"></div>

          <div className="mb-6">
            <p className="text-[#6C6B6B] font-normal flex items-center gap-3 mb-2"><CiLocationOn className="text-2xl" />Location: {pet?.petLocation}</p>
            <p className="text-[#6C6B6B] font-normal flex items-center gap-3 mb-2"><CiCalendar className="text-2xl" />Birth: {pet?.dateAdded}</p>
            <p className="text-[#6C6B6B] font-normal flex items-center gap-3"><IoMdTime className="text-2xl" />Age: {pet?.petAge}</p>
          </div>

          <div>
            <NavLink to={`/pets/${pet._id}`} type="submit" className="btn w-full hover:bg-[#F7A582] bg-white text-[#F7A582] border border-[#F7A582] hover:text-white font-semibold text-base font-sourceSans3 rounded-md px-7">View Details</NavLink>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default PetCard;
