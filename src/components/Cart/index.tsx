import CartProducts from "../Modules/Cart/CartProduct";
import Coupon from "../Modules/Cart/Coupon";
import Email from "../Modules/Cart/Email";
import PaymentDetails from "../Modules/Cart/PaymentDetails";
import NMContainer from "../ui/core/NMContainer";

interface CartPageProps {
  isModal?: boolean;
}

const CartPage = ({ isModal = false }: CartPageProps) => {
  return (
    <div className={isModal ? "bg-white overflow-y-auto" : ""}>
      {isModal ? (
        <div className="flex flex-col gap-2 my-5">
          <CartProducts />
          <div className="flex flex-col">
            <Coupon />
            <Email />
          </div>
          <PaymentDetails />
        </div>
      ) : (
        <NMContainer>
          <div className="grid grid-cols-12 gap-8 my-5">
            <CartProducts />
            <Coupon />
            <Email />
            <PaymentDetails />
          </div>
        </NMContainer>
      )}
    </div>
  );
};

export default CartPage;
