import useQuery from './use-query';


interface User {
    id: number;
    name: string;
    email: string;
}

export default function UseQueryDemo() {
    const { data, loading, error } = useQuery<User[]>('https://jsonplaceholder.typicode.com/users');

    if (loading) return <div className="loading">Loading from API...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;

    return (
        <div className="hook-demo">
            <h3>Users Data:</h3>
            <ul className="data-list">
                {data?.slice(0, 5).map(user => (
                    <li key={user.id}>{user.name} ({user.email})</li>
                ))}
            </ul>
        </div>
    );
}
