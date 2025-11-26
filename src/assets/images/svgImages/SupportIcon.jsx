

const SupportIcon = 

 ({ size = 20, className = "", alt = "thunder icon", ...props }) => {
    const numeric = typeof size === "number" ? size : Number(size) || 30;

    const dataUri="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAABA9JREFUeF7t3Itx1DAQBuDdDkgHpANSAaQD0gHpACoAKoAOSAekA0IFpIOkA9LBcn+Qb3Q+W+/VSY48k2GYOz/u80rWY2WmsWUJcNbeY2eqAigir4joNRG9qWD+RET4u2dm/Ku6qQKKCNC+EdE7IgJi7e2GiL4y86PWidUAReQ9Ef04EZzthSi8ZuZbDUQVQBH5YPA0rjn1mEBERBbdigM2ijehFUcsCtg4ngpiMcBO8IojFgHsDK8oYjZgJB6aE3dFa/Hjg6HJhOZTyJZdJ2YBJuBdarbJIGbanr9qISYDtog3hVxNxCTAlvFqI0YD9oBXEzEKsCe8WojBgD3i1UAMAuwZTxvRC7gFPE1EJ+CW8LQQVwG3iKeBuAi4ZbzSiEeAZiT5Z0hHkojQt1Xpnpl5FPRrMaL8qNEFTOixXM1Htg8AzQH/BA7Da+J93HVrP8+uA3MbXwJvbPDXIhFxMy/smzkHxBwGhuN9myaeazrgEzN/911c7OeRiLfMfDWdYw9oiszfgJOr4ZnRFJSAtelPFOXzgGuM/koEIqLwfJoytQFR32AYyLWp4hlAcV0A78pxtE7gDhGIKMb3OKwNiGlI18NDHc8AohSszSE/MfNZoEfS1wIR9wOxNqBvKvKGma+TripiJxHBgwIPkKWt1jX4ngVNAyL6UJXM60EUGTSZ1NM1RKRfwCnsTGP+rfn/b41J8bWCsQnAiFJf/KsDMJN0AA7ATIHM3UcEvnRA05hFUwJNGTRrkNuHfrBaoqRt3nUEOkaEjkZCMgNtdffeAdGdRLdyabtj5kstOKsN2m9DWnZ9OQeQel/Y9Mc3C0iaozEvIQIHoK/+8hThATgAfQKZn48IHICrArVGg082JzKewpnRPwAH4HOW/SjCOYEwAHP0/q/z2GwE1ppYPylg4MT6PkvLnljH4CXyUlybOuIpIzAQDz6Yn35esjZPLnoISG1TRRQRTKojT2dpw3sQLjJricXdI/Cw/9lRcpEZB3MNZtonVkP0ZMdmLw5c0ovEO+hQtJpgOc+PwXA+EixPnRvoTrA0UejL0qoViViyij9MKmEov3hOTGTk4Xe7U3ytrowvU6sKokZdZ/1G3JzsZbFjmUPYXVqte8dCGz+g88HlTZfd0pqRhDrP+9T3ApoHS/d1ogbeQUPaF8k9R6IWXhRgr5GoiRcN2BuiNl4SYC+INfCSAVtHrIWXBdgqYk28bMBExPHqp3mTJ7KJ42sx1frc20gOuZCghnTIgTpDLIJXpAjbuJ0gFsMrDphQJ4YEd8nvFMVTAWwYsTieGqBBHK9Bzi07pk2Gtb8h72HIPd18f0wBoMmkur6k2FPY9evN+ximRTM13miOtcV4v0LxeZT576wCWDq0WjreAMy8G/8AvSBgfkUe3kgAAAAASUVORK5CYII="

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

export default SupportIcon