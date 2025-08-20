import React from "react";
import { IoIosStarHalf, IoIosStar } from "react-icons/io";
const Ratings = ({ rating, size,extraClass }) => {
  const stars = [];

  for (let i = 1; i < 6; i++) {
    if (i <= rating) {
      stars.push(<IoIosStar color="#ffb931" fontSize={size} className={extraClass}/>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<IoIosStarHalf color="#ffb931" fontSize={size} className={extraClass}/>);
    } else {
      stars.push(<IoIosStar fontSize={size} className={`${extraClass} text-black/40`}/>);
    }
  }

  return (
    <>
      {stars.map((el, i) => (
        <span key={i}> {el}</span>
      ))}
    </>
  );
};

export default Ratings;
