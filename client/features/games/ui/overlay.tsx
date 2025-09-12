import GAMAdUnit from "@/components/ads/GAMAdUnit";
import { X } from "lucide-react";

interface ReviewTabProps {
    showExitButton: any
    countdown:any
    handleExitAd:any
}

 const Overlay = ({ showExitButton,countdown,handleExitAd }: ReviewTabProps) => {
  return (
   <div className="fixed inset-0 bg-black opacity-30 flex items-center justify-center z-50">
  <div className="relative bg-transparent text-center text-white p-6 w-full h-full">
    {/* Close button + countdown ở góc trên bên phải */}
    <div className="absolute top-4 right-4 flex items-center space-x-3">
      {!showExitButton ? (
        <div className=" px-3 py-1 rounded-md text-sm font-medium">
          {countdown}s
        </div>
      ) : (
        <button
          onClick={handleExitAd}
          className="text-black hover:bg-gray-200 rounded-full p-2 flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>

          {/* Nội dung chính quảng cáo */}
          <div className="w-full h-full ">
            <div className="flex flex-col items-center justify-center h-full">
            <div className="w-32 h-32 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📺</span>
            </div>

            <h2 className="text-2xl font-bold mb-2">Advertisement</h2>
            <p className="text-gray-300">Thank you for supporting our platform</p>
             <GAMAdUnit adId="div-gpt-ad-1755424941447-10" style={{ minWidth: 250, minHeight: 60 }} />
              {/* <GAMAdUnit adId="div-gpt-ad-1755424941447-11" style={{ minWidth: 250, minHeight: 60 }} /> */}
            </div>
          </div>

          {/* Nếu bạn vẫn muốn giữ continue button ở dưới */}
         
        </div>
      </div>
  )
}
export default Overlay