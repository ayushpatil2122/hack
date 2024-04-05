import OrderNavbar from '@/components/orderNavbar'
import React from 'react'


function layout({children}) {
  return (
    
    <main>
        <OrderNavbar/>
        {children}
    </main>

  )
}

export default layout