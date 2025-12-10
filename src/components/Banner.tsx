import banner from "../assets/banner.jpg"
import CategoryMenu from "../propsComponent/CategoriesMenu";

const Banner = () => {
  return (
    <div className="max-w-6xl mx-auto flex">
     <CategoryMenu />
     <img src={banner}  className="w-[953px] h-[358px] object-fit"  />

    
    </div>
  );
};

export default Banner;
