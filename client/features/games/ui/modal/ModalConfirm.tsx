import { Button } from '@/components/ui/button'
import React from 'react'

interface ReviewTabProps {
    handleConfirmNo: any
    handleConfirmYes:any
}
 const ModalConfirm = ({ handleConfirmNo,handleConfirmYes }: ReviewTabProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Unlock The Link</h3>
            <p className="text-gray-600 mb-6 text-center">
              Watch a short sponsored ad to unlock the link to the official site. This helps us keep the platform free.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={handleConfirmNo} className="px-6 bg-transparent">
                No, Thanks
              </Button>
              <Button
                onClick={handleConfirmYes}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6"
              >
                Yes, Continue
              </Button>
            </div>
          </div>
          </div>
  )
}
export default ModalConfirm