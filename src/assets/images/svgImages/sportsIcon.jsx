const SportsIcon = ({ size = 20, className = "", alt = "thunder icon", ...props }) => {
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

export default SportsIcon