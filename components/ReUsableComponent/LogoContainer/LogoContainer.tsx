import Image from 'next/image'
import React from 'react'
import logo from "../../../public/logo.png"
import { div } from 'framer-motion/client'

const LogoContainer = () => {
  return (
   
  <div>

          <div className="flex items-center gap-1 pl-2 pr-4  rounded-xl  bg-gradient-to-br from-[#9233EA] to-[#D643A9] pt-1 pb-2 border-b border-zinc-800">
 
  <div>
    <div className="w-14 h-14 rounded-xl sm:rounded-2xl flex items-center justify-center">
<div className="inline-block">
  <Image
    src={logo}
    width={40}
    height={40}
    alt="Spartst Logo"
    className="object-contain sm:w-9 sm:h-9"
    style={{
      filter: 'drop-shadow(0 0 0.5px white) drop-shadow(0 0 0.5px white)'
    }}
  />
</div>
    </div>
  </div>

  {/* Text Section */}
  <div>
    <div className="flex items-center gap-1.5 sm:gap-2">
<h2
  className="text-black font-bold text-xl sm:text-2xl tracking-tight"
  style={{
    textShadow: `
      -0.5px -1px 0 white,
       0.5px -1px 0 white,
      -0.5px  1px 0 white,
       0.5px  1px 0 white
    `
  }}
>
  SPARTST
</h2>
    </div>
    <p className="text-white text-[10px] sm:text-xs font-medium flex items-center justify-start pl-1 gap-1 sm:gap-1.5 mt-0.5">
      SPACE FOR ART
    </p>
  </div>
</div>
  </div>
  
  )
}

export default LogoContainer
