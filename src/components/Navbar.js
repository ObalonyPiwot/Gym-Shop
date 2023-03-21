const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>Blog</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/pages/Koszyk">Koszyk</a>
                <a href="/pages/Promocje">Promocje</a>
                <a href="/pages/Nowosci">Nowości</a>
                <a href="/pages/Konto">Konto</a>
            </div>
        </nav>
     );
}
 
export default Navbar;