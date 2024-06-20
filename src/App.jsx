import OtherPOST from "./pages/OtherPost";
import GetAllPost from "./pages/posts";

function App() {
  return (
    <div className="flex flex-row m-5">
        <GetAllPost />
        <OtherPOST/>
    </div>
  );
}

export default App;
