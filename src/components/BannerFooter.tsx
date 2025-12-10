import brand_1 from "../assets/brand_1.jpg";
import brand_2 from "../assets/brand_2.jpg";
import brand_3 from "../assets/brand_3.jpg";
import brand_4 from "../assets/brand_4.jpg";
export default function BannerFooter() {
  return (
    <div className="flex max-w-6xl mx-auto gap-12 mt-10 ">
      <img src={brand_1} className="w-[267px] h-[116px]" />
      <img src={brand_2} className="w-[267px] h-[116px]" />
      <img src={brand_3} className="w-[267px] h-[116px]" />
      <img src={brand_4} className="w-[260px] h-[116px]" />
    </div>
  );
}
