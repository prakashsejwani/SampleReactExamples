import { Provider } from 'react-redux';
import { useGetPostsQuery } from './postsApi';
import { useDispatch, useSelector } from 'react-redux';
import { makeStore } from './store';
import { selectSelectedPostId, setSelectedPostId } from './postsSlice';
import './styles.scss';

const store = makeStore();

function ReduxDemoContent() {
    const { data: posts, isLoading, isError, error } = useGetPostsQuery();
    const dispatch = useDispatch();
    const selectedPostId = useSelector(selectSelectedPostId);

    if (isLoading) {
        return (
            <div className="redux-demo">
                <h2>Redux + RTK Query Demo</h2>
                <div className="demo-content">
                    <p className="loading">Loading posts…</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="redux-demo">
                <h2>Redux + RTK Query Demo</h2>
                <div className="demo-content">
                    <p className="error">Error loading posts. {String(error && 'data' in error ? error.data : '')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="redux-demo">
            <h2>Redux + RTK Query Demo</h2>
            <div className="demo-content">
                <p className="instruction">
                    Posts are fetched with RTK Query. Click a post to select it (state in Redux slice).
                </p>
                <ul className="posts-list" role="list">
                    {posts?.map((post) => (
                        <li key={post.id}>
                            <button
                                type="button"
                                className={selectedPostId === post.id ? 'selected' : ''}
                                onClick={() => dispatch(setSelectedPostId(post.id === selectedPostId ? null : post.id))}
                            >
                                {post.title}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="output-group">
                    <div className="output-row">
                        <span className="output-label">Selected post ID</span>
                        <span className="output-value" data-testid="selected-post-id">
                            Selected: {selectedPostId ?? 'none'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ReduxDemo() {
    return (
        <Provider store={store}>
            <ReduxDemoContent />
        </Provider>
    );
}
