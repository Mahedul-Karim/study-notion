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

export const ITEMS_PER_PAGE = 4;