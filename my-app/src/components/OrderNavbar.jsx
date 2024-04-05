import React from 'react'

function OrderNavbar() {
  return (
    <nav className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div>
            <ul className="flex space-x-4">
                <li>
                    <a href="/order/items" className="text-white hover:text-gray-300">items</a>
                </li>
                <li>
                    <a href="/order/cart" className="text-white hover:text-gray-300">cart</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
  )
}

export default OrderNavbar
