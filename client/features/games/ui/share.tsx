'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Check, Copy, Facebook, MessageCircle, Send, Share2, Twitter } from 'lucide-react'
import { shareGame } from '@/utils/seo'

 const Share = ( { game }:any ) => {
  const [copied, setCopied] = useState(false)
  const shareData = shareGame(game)

const handleCopyLink = async () => {
try {
    await navigator.clipboard.writeText(shareData.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
} catch (error) {
    console.error("Failed to copy:", error)
}

}
  return (
     <Dialog>
            <DialogTrigger asChild>
               <Button
                variant="outline"
                size="sm"
                className="hover:bg-pink-50 hover:border-pink-300 bg-transparent"
            >
                <Share2 className="w-4 h-4 mr-2" />
                Share
            </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    readOnly
                    value={shareData.url}
                    className="flex-1 px-3 py-2 bg-gray-100 border rounded-md text-sm"
                  />
                  <Button size="sm" onClick={handleCopyLink}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => window.open(shareData.twitter, "_blank")}
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => window.open(shareData.facebook, "_blank")}
                  >
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => window.open(shareData.whatsapp, "_blank")}
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => window.open(shareData.telegram, "_blank")}
                  >
                    <Send className="h-4 w-4" />
                    Telegram
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
  )
}
export default Share
