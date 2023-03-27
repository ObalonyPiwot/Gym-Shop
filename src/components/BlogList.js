const BlogList = ({blogs, title}) => {
    return (
        <div className="blogList">
            <h2>{title}</h2>
            {blogs.map((blog) => {
                const photo = blog.photo;
                let src = require(`${photo}`);
                return (
                    <div className='blogPreview' key={blog.id}>
                        <div class="image">
                            <img src={src} alt={blog.title} />
                        </div>
                        <div class="text">
                            <div class="top">
                                <h2>{blog.title}</h2>
                            </div>
                            <div class="middle">
                                <p>{blog.body}</p>
                            </div>
                            <div class="bottom">
                                <table>
                                    <tr>
                                        <th> <p className="cena">Cena: {blog.cena}</p></th>
                                        <th> <button>Dodaj do koszyka</button></th>
                                    </tr>
                                    <tr>
                                        <th> <p className="author">Producent: {blog.author}</p></th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default BlogList;