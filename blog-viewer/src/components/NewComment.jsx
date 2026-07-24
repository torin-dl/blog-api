import { useState } from "react";
import { useAuth } from '../hooks/authContext'

function NewComment({ postId, onDone, refetch }) {
    const [comment, setComment] = useState(null)
    const [error, setError] = useState(null)

    const { token } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({ body: comment }),
            })

            if (!response.ok) {
                setError('Something went wrong')
                return
            }
            await refetch()
            onDone()
        } catch (err) {
            console.log(err.message)
            setError('Something went wrong, please try again')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <textarea name="comment" id="comment" onChange={(e) => setComment(e.target.value)}></textarea>
            <button type="submit">Submit</button>
        </form>
    )
}

export default NewComment