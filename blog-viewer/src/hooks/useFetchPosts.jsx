import { useState, useEffect } from "react";

const useFetchPosts = () => {
    const [posts, setPosts] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
                    method: 'GET',
                })
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message);
                }
                const data = await response.json()
                setPosts(data)
                setLoading(data)
            } catch (err) {
                console.log(err)
                setError(err.message)
            }
        }
        fetchPosts()
    }, [])
    return { posts, error, loading }
}

export default useFetchPosts