import useFetchPosts from "../hooks/useFetchPosts"
function Home() {
    const { posts, error, loading } = useFetchPosts()
    return (
        <>
            <p className="loading">{loading ? 'Loading...' : null}</p>
            <p className="error">{error ? 'A network error has occurred' : null}</p>
            {posts ? posts.map((post) => {
                console.log(post);
                <Card post={post} />
            }) : null}
        </>
    )
}

export default Home