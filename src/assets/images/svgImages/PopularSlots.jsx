import React from 'react'

const PopularSlots = ({ size = 20, className = "", alt = "thunder icon", ...props }) => {
    const numeric = typeof size === "number" ? size : Number(size) || 30;

    const dataUri = "data:image/png;base64,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"
    return (
        <>
            <svg
                width={numeric}
                height={numeric}
                viewBox="0 0 20 20"
                role="img"
                aria-label={alt}
                className={className}
                {...props}
                style={{ display: "inline-block", verticalAlign: "middle" }}
            >
                {/* Optional visible background so you can check if the SVG is present */}
                <rect width="20" height="20" fill="transparent" />

                {/* Simpler image embedding. Use href in JSX (not xlinkHref). */}
                <image
                    href={dataUri}
                    width="20"
                    height="20"
                    preserveAspectRatio="xMidYMid slice"
                />

                {/* Fallback text if image doesn't render (helpful for debugging) */}
                <title>{alt}</title>
            </svg>
        </>
    )
}

export default PopularSlots