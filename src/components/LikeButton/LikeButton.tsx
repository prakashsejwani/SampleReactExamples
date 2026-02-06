import { useState } from 'react';
import { HeartIcon, SpinnerIcon } from './icon';
import "./LikeButton.scss";

const LIKE_URL = "https://questions.greatfrontend.com/api/questions/like-button";

export default function LikeButton() {
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await fetch(LIKE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: like ? 'unlike' : 'like' })
      });

      if (!response.ok) throw new Error("Failed to toggle like");

      setLike(!like);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="like-showcase">
      <button
        className={`like-button-main ${like ? 'liked' : ''} ${loading ? 'loading' : ''}`}
        onClick={toggleLike}
        disabled={loading}
      >
        {loading ? (
          <SpinnerIcon className="spinner" />
        ) : (
          <HeartIcon />
        )}
        <span>{like ? 'Liked' : 'Like'}</span>
      </button>
    </div>
  );
}
