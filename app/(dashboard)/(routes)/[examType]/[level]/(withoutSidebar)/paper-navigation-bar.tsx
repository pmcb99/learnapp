
"use client";
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

function PaperNavigationBar() {

  const router = useRouter()

  

  // get current client side url
  const currentUrl = window.location.href

  return (
   <div className=' flex px-5 items-center justify-center gap-x-5'>
    <Button className="w-auto h-auto" variant={"hollow"} onClick={() => router.back()}> 
      <MessageCircle className="" size={20} />
      Open Rewise Chat
    </Button>
    {currentUrl.includes("higher") && <Button className="w-auto h-auto" variant="hollow" onClick={() => router.push(currentUrl.replaceAll("higher","ordinary")) }>Switch To Ordinary</Button>}
    {currentUrl.includes("ordinary") && <Button className="w-auto h-auto" variant="hollow" onClick={() => router.push(currentUrl.replaceAll("ordinary","higher")) }>Switch To Higher</Button>}
   </div> 
  )
}

export default PaperNavigationBar