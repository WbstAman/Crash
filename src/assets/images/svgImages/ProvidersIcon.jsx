import React from 'react'

const ProvidersIcon =  ({ size = 20, className = "", alt = "thunder icon", ...props }) => {
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

export default ProvidersIcon