import CreatePost from "./createPost";
import UpdatePOST from "./updatepost";

const OtherPOST = () => {
    return ( 
        <div className="flex flex-col gap-4">
            <CreatePost/>
            <UpdatePOST/>
        </div>
     );
}
 
export default OtherPOST;