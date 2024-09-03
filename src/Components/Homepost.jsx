/* eslint-disable react/prop-types */
import ClipLoader from "react-spinners/ClipLoader";
import { Container, PostCard } from "./Index";

function Homepost(props) {
  return (
    <div>
      <div className="w-full py-8">
        <Container>
          {props.loading && (
            <ClipLoader
              color={props.color}
              loading={props.loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
          <div className="flex flex-wrap">
            {props.posts?.map((post) => {
              return (
                <div className="p-2 w-1/4" key={post.$id}>
                  <PostCard {...post} />
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Homepost;
