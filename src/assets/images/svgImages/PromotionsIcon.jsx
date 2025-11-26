const PromotionsIcon = 

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

export default PromotionsIcon