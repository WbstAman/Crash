const AffiliateIcon = 

 ({ size = 20, className = "", alt = "thunder icon", ...props }) => {
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

export default AffiliateIcon