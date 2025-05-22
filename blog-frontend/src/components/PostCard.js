import { Link } from 'react-router-dom';

const PostCard = ({ post }) => (
  <div className="card mb-3 shadow-sm">
    <div className="card-body">
      <h5 className="card-title">{post.title}</h5>

      <div
        className="card-text"
        dangerouslySetInnerHTML={{
          __html: post.content?.length > 100
            ? post.content.slice(0, 100) + '...'
            : post.content
        }}
      />

      <small className="text-muted d-block mt-2">
        By <strong>{post.User?.username || 'Unknown'}</strong> on{' '}
        {new Date(post.createdAt).toLocaleDateString()}
      </small>

      <Link to={`/post/${post.id}`} className="btn btn-sm btn-primary mt-3">
        Read More
      </Link>
    </div>
  </div>
);

export default PostCard;
