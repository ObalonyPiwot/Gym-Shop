const BlogList = ({ blogs, title, childToParent, id }) => {
    return (

        <div className="blogList" id={id}>
            <div className="blogTitleDiv">
                <div className="blogTitle">
                    <h2>{title}</h2>
                </div>
            </div>
            <div className="blogPreviewDiv">

                {blogs.map((blog) => {

                    return (
                        <a className='blogPreview' key={blog.id} onClick={() => childToParent(blog)}>
                            <div className="image">
                                <img src={blog.photo} alt="Product" />
                            </div>
                            <div className="text">
                            <div className="top">
                                <p title={blog.title}>{blog.title.length > 20 ? blog.title.substring(0, 20) + '...' : blog.title}</p>
                            </div>

                                {/* <div className="middle"> Opis
                                    <p>{blog.body}</p>
                                </div> */}
                                <div className="bottom">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>
                                                    <p className="cena">Cena: {blog.cena}</p>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th className="guzior">
                                                    <button>Pokaż więcej</button>
                                                </th>
                                            </tr>
                                            {/* <tr>
                                                <th>
                                                    <p className="author">Producent: {blog.author}</p>
                                                </th>
                                                </tr> */}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </a>
                    )
                })}
            </div>
        </div>
    );
}

export default BlogList;