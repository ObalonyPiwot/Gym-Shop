//const BlogList = (props) => {
const BlogList = ({blogs, title}) => {
    //const blogs = props.blogs;
    //const title = props.title;
    return (
    <div className="blogList">
        <h2>{ title }</h2>
            {blogs.map((blog) => (
                <div className='blogPreview' key={blog.id}>
                    <h2>{blog.title}</h2>
                    <p>body {blog.body}</p>
                    <p>author {blog.author}</p>
                </div>
            ))}
        </div>
     );
}
export default BlogList;