import Button from "./button";

const header = ({ onAdd, showAdd }) => {
  return (
    <header className="header">
      <h1>TASK TRACKER</h1>
      <Button text="Add"   // eslint-disable-next-line 
      text = {showAdd ?'Close':'Add'}   
      color={showAdd ? "red" : "green"} 
      onClick={onAdd} />
    </header>
  );
};

// incase you want to use an external style like below

// const headerstyling = {
//     color:'silver',
//     backgroundColor:'black'

// }
export default header;
