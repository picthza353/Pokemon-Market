/* eslint-disable @next/next/no-img-element */
import { Data } from "../page";
import { CartItem } from "../page";

interface CartProps {
  cartItems: CartItem[];
  onUpdateCart: (card: Data, quantity: number) => void;
  onClearCart: () => void;
  onCloseCart: () => void;
}

export default function Cart({
  cartItems,
  onUpdateCart,
  onClearCart,
  onCloseCart,
}: CartProps) {
  const getTotalAmount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () =>
    cartItems.reduce(
      (total, item) =>
        total +
        item.quantity * (item.card.cardmarket?.prices?.averageSellPrice || 0),
      0
    );

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}..` : text;
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
      <div className="fixed right-0 top-0 w-full h-full bg-bgCard p-4 shadow-lg z-50 sm:w-96">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-[26px] text-white font-semibold cursor-default">
              Cart
            </p>
            {cartItems.length === 0 ? (
              <></>
            ) : (
              <p
                onClick={onClearCart}
                className="text-[12px] text-textPrice font-normal cursor-pointer underline decoration-1"
              >
                Clear all
              </p>
            )}
          </div>
          <button
            onClick={onCloseCart}
            className="flex text-xl text-white relative p-2 bg-orange rounded-[6px] hover:bg-[#D76D5A] h-11 w-11 items-center justify-center shadow-[0px_8px_24px_0px_#EA7C694D]"
          >
            &#10005;
          </button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-8">
            <p className="text-[14px] text-white font-normal cursor-default">
              Item
            </p>
            <p className="text-[14px] text-white font-normal cursor-default">
              Qty
            </p>
          </div>
          <p className="text-[14px] text-white font-normal cursor-default">
            Price
          </p>
        </div>
        <div className="h-[calc(100vh-250px)] overflow-y-auto">
          {cartItems.map((item, index: number) => (
            <>
              <div key={index} className="flex justify-between mb-2 gap-4">
                <div className="flex gap-4">
                  <img
                    src={item.card.images.small}
                    alt={item.card.name}
                    className="w-11 h-[60px] object-contain"
                  />
                  <div className="w-[140px]">
                    <p className="text-[12px] text-white font-medium cursor-default">
                      {truncateText(item.card.name, 17)}
                    </p>
                    <p className="text-[12px] text-textPrice font-normal cursor-default">
                      ${" "}
                      {item.card.cardmarket?.prices?.averageSellPrice?.toFixed(
                        2
                      )}
                    </p>
                  </div>
                </div>
                <p className="text-[12px] text-white font-medium cursor-default">
                  ${" "}
                  {(
                    item.quantity *
                    (item.card.cardmarket?.prices?.averageSellPrice || 0)
                  ).toFixed(2) || "N/A"}
                </p>
              </div>
              <div className="flex justify-between mb-4">
                <button
                  onClick={() => onUpdateCart(item.card, item.quantity - 1)}
                  className="w-12 h-12 px-2 py-1 bg-[#373945] text-white rounded-lg hover:bg-[#474650]"
                >
                  -
                </button>
                <input
                  type="text"
                  value={item.quantity}
                  className="h-12 py-2 rounded-lg text-center bg-[#373945] text-white focus:bg-[#242633]"
                  onChange={(e) => {
                    let newQuantity = parseInt(e.target.value, 10);
                    if (!isNaN(newQuantity) && newQuantity > 0) {
                      if (newQuantity > item.card.set.total) {
                        newQuantity = item.card.set.total;
                      }
                      onUpdateCart(item.card, newQuantity);
                    }
                  }}
                />
                <button
                  onClick={() => onUpdateCart(item.card, item.quantity + 1)}
                  className={`w-12 h-12 px-2 py-1 bg-[#373945] text-white rounded-lg ${
                    item.quantity >= item.card.set.total
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#474650]"
                  }`}
                  disabled={item.quantity >= item.card.set.total}
                >
                  +
                </button>
              </div>
            </>
          ))}
        </div>
        <div className="py-4">
          <div className="flex justify-between pb-2">
            <p className="text-[12px] text-textPrice font-normal cursor-default">
              Total card amount
            </p>
            <p className="text-[12px] text-white font-medium cursor-default">
              {getTotalAmount()}
            </p>
          </div>
          <div className="flex justify-between pb-2">
            <p className="text-[12px] text-textPrice font-normal cursor-default">
              Total price
            </p>
            <p className="text-[12px] text-white font-medium cursor-default">
              $ {getTotalPrice().toFixed(2)}
            </p>
          </div>
          <button className="w-full bg-orange text-white py-2 rounded hover:bg-[#D76D5A] shadow-[0px_8px_24px_0px_#EA7C694D]">
            Continue to payment
          </button>
        </div>
      </div>
    </>
  );
}
