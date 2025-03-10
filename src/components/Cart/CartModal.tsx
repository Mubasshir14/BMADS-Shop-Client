import { Dialog, DialogContent } from "@/components/ui/dialog";
import CartPage from ".";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
        <div className="sticky top-0 bg-background z-10 pb-2 mb-2 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="pt-2">
          <CartPage isModal={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;