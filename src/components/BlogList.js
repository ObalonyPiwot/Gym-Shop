import PreviewBlog from "./PreviewBlog";

const BlogList = ({blogs, title, childToParent}) => {
    
    return (

        <div className="blogList">
            <div className="blogTitleDiv">         
                <div className="blogTitle">
                        <h2>{title}</h2>
                </div> 
            </div>
            <div className="blogPreviewDiv">
                
                {blogs.map((blog) => {
                    const photo = blog.photo;
                    let src = require(`${photo}`);
                    return (
                        <a className='blogPreview' key={blog.id} onClick={() => childToParent(blog)}>
                            <div class="image">
                                <img src={src} alt={blog.title} />
                            </div>
                            <div class="text">
                                <div class="top">
                                    <p>{blog.title}</p>
                                </div>
                                {/* <div class="middle"> Opis
                                    <p>{blog.body}</p>
                                </div> */}
                                <div class="bottom">
                                    <table>
                                        <tr>
                                            <th> <p className="cena">Cena: {blog.cena}</p></th>
                                        </tr>
                                        <tr>
                                            <th className="guzior"> <button>Pokaż więcej</button></th>
                                        </tr>
                                        {/* <tr>
                                            <th> <p className="author">Producent: {blog.author}</p></th>
                                        </tr> */}
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