import { useEffect, useState } from "react";
import servies from "../Appwrite/Conf";

import Homepost from "../Components/Homepost";
import Hometext from "../Components/hometext";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const color = "#ffffff";

  useEffect(() => {
    setLoading(true);
    servies.getposts().then((post) => {
      if (post) {
        setPosts(post.documents);
      }
    });
    setLoading(false);
  }, []);

  return posts.length !== 0 ? (
    <Homepost loading={loading} color={color} posts={posts} />
  ) : (
    <Hometext />
  );
}

export default Home;
