import tealClimateLogo1 from "../../assets/teal-climate-logo-1.svg";
import tealClimateLogo2 from "../../assets/teal-climate-logo-2.svg";
const VerticalLogo = () => {
  return (
  <div className="flex flex-col items-center gap-5">
        <img src={tealClimateLogo1} alt="Logo 1" className="w-16" />
        <img src={tealClimateLogo2} alt="Logo 2" className="w-40" />
      </div>
  )
}

export default VerticalLogo
