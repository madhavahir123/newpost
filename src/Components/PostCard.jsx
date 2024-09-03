/* eslint-disable react/prop-types */
import appwriteServies from "../Appwrite/Conf";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featureimg }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 ">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteServies.getfilePreview(featureimg)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
