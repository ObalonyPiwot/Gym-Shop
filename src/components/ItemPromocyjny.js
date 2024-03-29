const ItemPromocyjny = ({blogs, title}) => {
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
                        <div className='blogPreview' key={blog.id}>
                            <div className="image">
                                <img src={src} alt={blog.title} />
                            </div>
                            <div className="text">
                                <div className="top">
                                    <p>{blog.title}</p>
                                </div>
                                {/* <div className="middle">
                                    <p>{blog.body}</p>
                                </div> */}
                                <div className="bottom">
                                    <table>
                                        <tr>
                                            <th> <p className="cena" >Cena: {blog.cena} </p><p className="cena2">{blog.cena2}</p></th>
                                        </tr>
                                        <tr>
                                            <th className="guzior"> <button>Dodaj do koszyka</button></th>
                                        </tr>
                                        {/* <tr>
                                            <th> <p className="author">Producent: {blog.author}</p></th>
                                        </tr> */}
                                    </table>
                                </div> 
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default ItemPromocyjny;