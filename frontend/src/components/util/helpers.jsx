import { io } from 'socket.io-client';

export const highlightText = (fullText, textToHighlight) => {
  const textArray = fullText.split(new RegExp(`(${textToHighlight})`, "i"));

  return (
    <>
      {textArray.map((text, i) =>
        text?.toLowerCase() === textToHighlight?.toLowerCase() ? (
          <span key={i} className="text-primary">
            {text}
          </span>
        ) : (
          text
        )
      )}
    </>
  );
};

export const socket = io(import.meta.env.VITE_SOCKET_URL,{
  transports:['websocket']
})

export const ITEMS_PER_PAGE = 4;