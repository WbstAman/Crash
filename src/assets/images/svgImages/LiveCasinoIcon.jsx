import React from 'react'

const LiveCasinoIcon =({ size = 20, className = "", alt = "thunder icon", ...props }) => {
    const numeric = typeof size === "number" ? size : Number(size) || 30;

    const dataUri="data:image/png;base64,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"
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

export default LiveCasinoIcon