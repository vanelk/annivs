import React, { useState } from 'react';
import Link from './Link';
export default function TabBar({onChange}) {
    const [active, setActive] = useState(1);
    const handleClick = (n) => {
        setActive(n);
        if (typeof onChange === 'function') onChange(n);
    }
    return (
        <div className="tab-bar">
            <button aria-label="home" onClick={() => handleClick(1)} className={["tab-btn", active === 1 ? "active" : ""].join(" ")}>
                <span className="icon-home"></span>
            </button>
            <div className="tab-btn">
                <Link to="/app/add">
                    <button aria-label="add" className="pill">
                        <span className="icon-union"></span>
                    </button>
                </Link>
            </div>
            <button aria-label="calendar" onClick={() => handleClick(2)} className={["tab-btn", active === 2 ? "active" : ""].join(" ")}>
                <span className="icon-calendar"></span>
            </button>
        </div>
    )
}
