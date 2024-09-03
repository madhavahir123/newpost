import { useEffect, useState } from "react";
import servies from "../Appwrite/Conf";
import { Container, PostCard } from "../Components/Index";
import ClipLoader from "react-spinners/ClipLoader";
function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const color = "#000000";
  useEffect(() => {
    setLoading(true);
    servies.getposts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
    setLoading(false);
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        {loading && (
          <div className="flex justify-center">
            <ClipLoader
              color={color}
              loading={loading}
              size={70}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
