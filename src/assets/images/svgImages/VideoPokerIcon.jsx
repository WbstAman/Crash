import React from 'react'

const VideoPokerIcon = ({ size = 20, className = "", alt = "thunder icon", ...props }) => {
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

    </>  )
}

export default VideoPokerIcon