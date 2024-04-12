import React from "react";
import { IoIosStarHalf, IoIosStar } from "react-icons/io";
const Ratings = ({ rating, size }) => {
  const stars = [];

  for (let i = 1; i < 6; i++) {
    if (i <= rating) {
      stars.push(<IoIosStar color="yellow" fontSize={size} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<IoIosStarHalf color="yellow" fontSize={size} />);
    } else {
      stars.push(<IoIosStar color="gray" fontSize={size} />);
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
