import React from "react"

function CardHeader({ children }) {
    return (
        <div className="card-title">
            {children}
        </div>
    )
}

export default CardHeader