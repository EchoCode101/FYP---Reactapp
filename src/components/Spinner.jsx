import loading from "../loading_24.gif";
const Spinner = () => {
  return (
    <div className="text-center">
      <img className="my-3" src={loading} alt="loading gif" />
    </div>
  );
};

export default Spinner;
