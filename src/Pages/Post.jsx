import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import servies from "../Appwrite/Conf";
import Button from "../Components/Button";
import { Container } from "../Components/Index";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const color = "#ffffff";

  const { slug } = useParams();
  const navigate = useNavigate();

  const userdata = useSelector((state) => state.auth.userData);

  const isAuthor = post && userdata ? post.userid === userdata.$id : false;

  useEffect(() => {
    if (slug) {
      servies
        .getPost(slug)
        .then((post) => {
          if (post) setPost(post);
        })
        .catch((error) => {
          console.log("error", error);
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    setLoading(true);
    servies.deletepost(post.$id).then((status) => {
      if (status) {
        servies.deleteFile(post.featureimg);
        toast.success("Delete successful!");
        navigate("/");
      }
    });
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <ClipLoader
          color={color}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {post ? (
        <div className="py-8">
          <Container>
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
              <img
                src={servies.getfilePreview(post.featureimg)}
                alt={post.title}
                className="rounded-xl"
              />

              {isAuthor && (
                <div className="absolute right-6 top-6">
                  <Link to={`/edit-post/${post?.$id}`}>
                    <Button bgColor="bg-green-500" className="mr-3">
                      Edit
                    </Button>
                  </Link>
                  <Button bgColor="bg-red-500" onClick={deletePost}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
            <div className="w-full mb-6">
              <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            {/* <div className="browser-css">{parse(post.content)}</div> */}
          </Container>
        </div>
      ) : null}
    </>
  );
}

export default Post;
