import React from "react";

function Sidebar(){
    return(
        <div className="sidebar">
            {/* <li><a href="index.html">Suplementy</a></li>
            <li><a href="index2.html">Akcesoria</a></li>
			<li><a href="index3.html">Sprzęt</a></li> */}
            <a href="#suplementy">Suplementy</a>
            <a href="#akcesoria">Akcesoria</a>
			<a href="#sprzet">Sprzęt</a>
        </div>
    )
}

export default Sidebar;