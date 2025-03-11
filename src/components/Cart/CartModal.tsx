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
        <div className="pt-2">
          <CartPage isModal={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
