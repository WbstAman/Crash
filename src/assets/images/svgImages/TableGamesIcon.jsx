import React from 'react'

const TableGamesIcon = 
 ({ size = 20, className = "", alt = "thunder icon", ...props }) => {
    const numeric = typeof size === "number" ? size : Number(size) || 30;

    const dataUri =
    "data:image/png;base64,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"
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

export default TableGamesIcon