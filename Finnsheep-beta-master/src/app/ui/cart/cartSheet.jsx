import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { FaBasketShopping } from "react-icons/fa6"
  

const CartSheet = () => {
  return (
    <div>
        <Sheet>
  <SheetTrigger className="flex">
  <FaBasketShopping  className='size-6 text-gray-800 hover:text-blue-700 cursor-pointer'/>
  </SheetTrigger>
  <SheetContent className="w-full">
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

    </div>
  )
}

export default CartSheet