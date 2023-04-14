import { cookies } from 'next/dist/client/components/headers'

import { CartFragment, cartFragment } from '~/shopify/sdk-gen/fragments'
import { storefront } from '~/shopify/sdk-gen/sdk'
import { cartCookieKey } from '~/shopify/storefront-hooks/cart-cookie-key'

import CartButton from './cart-btn'
import Logo from './logo'

export default async function Nav() {
  const cookieStore = cookies()
  const cookie = cookieStore.get(cartCookieKey)
  const cartId = cookie?.value

  let prefetchedCart: CartFragment | undefined = undefined
  if (cartId) {
    const { cart } = await storefront.query({
      cart: { __args: { id: cartId }, ...cartFragment }
    })
    prefetchedCart = cart
  }

  return (
    <div className=" fixed top-0 z-50 min-w-full bg-cream">
      <div className="m-auto max-w-7xl">
        <nav className="  flex h-24 w-full max-w-7xl items-center justify-between bg-cream font-display text-base font-bold text-black">
          <Logo />
          <div className="flex gap-8 py-2">
            <div>HOME</div>
            <div>ABOUT</div>
            <div>SHOP ALL</div>
          </div>
          <CartButton prefetchedCart={prefetchedCart} />
        </nav>
      </div>
    </div>
  )
}
