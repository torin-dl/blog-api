function Card({ post }) {
    return (
        <div className="card">
            <div className="post">
                <h3 className="title">{post.title}</h3>
                <p className="body">{post.body}</p>
                <p className="post-date">{post.createdAt}</p>
            </div>
            <div className="comments">
                {post.comments ? post.comments.map(comment =>
                    <div className="comment" key={comment.id}>
                        <p>{comment.user}</p>
                        <p>{comment.body}</p>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Card;