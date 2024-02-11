import Post from "../components/Post";
import Share from "../components/Share";
import "../assets/styles/feed.css";
import { Posts } from "../assets/dummy/dummyData";

export default function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
