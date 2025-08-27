type Props = {
  onClose?: () => void;
};

const Content: React.FC<Props> = ({ onClose }) => {
  return (
    <div className={"content"}>
      <p>This is the content component.</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};
export default Content;
