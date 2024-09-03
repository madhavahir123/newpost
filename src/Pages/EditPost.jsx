import { Container, PostForm } from "../Components/Index";
import servies from "../Appwrite/Conf";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
function EditPost() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const color = "#000000";
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (slug) {
      servies.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    }
    setLoading(false);
  }, [slug, navigate]);

  return posts ? (
    <div className="py-8">
      <Container>
        {loading && (
          <ClipLoader
            color={color}
            loading={loading}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
        <PostForm post={posts} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
