import useFetchPosts from "../hooks/useFetchPosts"
import Card from "./Card"

function Home() {
    const { posts, error, loading, refetch } = useFetchPosts()
    return (
        <>
            <p className="loading">{loading ? 'Loading...' : null}</p>
            <p className="error">{error ? 'A network error has occurred' : null}</p>
            {posts ? posts.map((post) => {
                return <Card post={post} key={post.id} refetch={refetch} />
            }) : null}
        </>
    )
}

export default Home