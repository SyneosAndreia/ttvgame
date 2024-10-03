// Helper component to render HTML content
export const HTMLContent = ({ content, as: Element = "div", ...props }) => (
  <Element {...props} dangerouslySetInnerHTML={{ __html: content }} />
);


//HELPER TO format time as 00:00.00
export const formatTime = (timeInMilliseconds) => {
  const minutes = Math.floor(timeInMilliseconds / 60000);
  const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
  const milliseconds = Math.floor((timeInMilliseconds % 1000) / 10);

  return `${minutes.toString().padStart(2, 0)}:${seconds
    .toString()
    .padStart(2, 0)}.${milliseconds.toString().padStart(2, 0)}`;
};