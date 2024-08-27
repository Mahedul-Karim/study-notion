import Heading from "../../common/Heading";
import CartItem from "./CartItem";
import FormButton from "../../../ui/inputs/FormButton";
import { useData } from "../../../../hooks/useData";
import Spinner from "../../../ui/Spinner";
import Empty from "../../../ui/Empty";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../../util/format";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../../util/api";
import { useApi } from "../../../../hooks/useApi";

let existingCarts = [];

const Cart = () => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const cartItemsPrice = data?.reduce((acc, item) => {
    return acc + item?.courseId?.price;
  }, 0);

  const { mutate } = useApi({
    success: () => {},
    error: (err) => {
      setTimeout(() => {
        toast.error(err);
        setData(existingCarts);
      }, 2000);
    },
  });

  useEffect(() => {
    (async function () {
      try {
        setIsPending(true);
        const res = await apiConnector("/course/cart", {
          method: "GET",
        });
        setData(res?.carts);
      } catch (err) {
        toast.error(err.message);
        setData([]);
      } finally {
        setIsPending(false);
      }
    })();
  }, []);

  const handleRemoveCart = (id) => {
    existingCarts = [...data];

    setData((prev) => prev.filter((cart) => cart.courseId._id !== id));

    toast.success("Course was removed from wishlist");

    const options = {
      method: "DELETE",
    };

    mutate({ endpoint: `/course/cart/${id}`, options });
  };

  return (
    <>
      <Heading>Wishlist</Heading>
      {isPending && (
        <div className="w-full lg:mt-16 h-full flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isPending && data?.length === 0 && (
        <Empty height="h-full" showText={false} />
      )}
      {data?.length > 0 && !isPending && (
        <>
          <div className="text-richblack-300 font-semibold text-[17px]">
            {data?.length} courses in wishlist
            <span className="h-[0.5px] mt-2 bg-border w-full block" />
          </div>
          <div className="grid grid-cols-1 gap-x-4">
            <div className="flex flex-col cart">
              {data?.map((cart, i) => (
                <CartItem
                  key={i}
                  course={cart?.courseId}
                  handleRemoveCart={handleRemoveCart}
                />
              ))}
            </div>

            
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
