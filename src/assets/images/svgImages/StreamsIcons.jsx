const StreamsIcons =

    ({ size = 20, className = "", alt = "thunder icon", ...props }) => {
        const numeric = typeof size === "number" ? size : Number(size) || 30;

        const dataUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAB11JREFUeF7tXO2VHDUQlCIARwDOAGeAI8BEYDsCcAT4IsCOABMBdgSYCDARcBlgIhBbizRvZrarume0n/dm3rtfu9KOStXd1a3W5bQ9XQjkrtHb4LQB2EmCDcANwE4EOodvDLwEgKWUL1NK36SU7nPO953vcFXDSylY11cppb8ia1vMwFLK85TSm90fQMTzJuf86qpQWPkypZTXKaWfRsNf5Jx/VdMtArCU8t2Oee+NCZ/lnD+sfO+rGFaJ8W72Mp9TSk9zzp/YS4YBLKV8nVL6c8S88Zzvcs4vrwKJlS+xWx/Ag3XNH7gogGi6qhCAFbzfU0oA0Xrucs6g/80+hvmO1wLwnuScwcjJEwUQzINztR5MislvOpg4FoZ1m1bmAujsDCa+ef/XWFFK+TalBEtjz6ucMwLo8EgA6678vWTCm7Xh+uKllB9TSj8La5sEFQ9AgPdg/R7b7J3OBct+IJ9/zDk/bZ9RAB3T/bSTLU8U26o5fBEVpOdgbk0AIMU+e7JrJ9mU3x9M2QTQMV0Z1utL/pZSgj/B42qpM4EH4CBVWgJAIyvexwkqWNNjRGUGINNEmFuqc7Jz2PFH5wBKmKXljiCQ4dMO5EkFUfnDvXQ7ANBh3/uc8/fiJeF88aPWgx27iNRx1iSTgFIKonKzpvG6/mfhfKVCkeOrFIRSCpzuJMTP5n7EdvrUzKxu5Z81asKRNncTANfuVEDuXDxTcSKrTAYEqaY+0Im8in1K7rgR+9QMbPM7kXUiT8bvpAgyZyADgvoJUsVov08jdjUNlI6QIiIywqHDBfxxKl9ZTRnyhGnbg0xjBD6UxbP5Zg8AOraOXNcs6ewAVOwzWev4S4D+2qvDrWVtLZgiMDQ5cxgYjKjM8BkDyKQLNUGHfabfC/jLMXtPAqSTrlF/bUXkMYCMSVT3Cfah1P/YYonjzK0hJ2Gk8IdUs1rA7wGstIZvCOs3h30KdJUiKcv8mFJ6eSz/6LgsiGv83uSx5FADkCluZb6mU60HTSb76mYpnxlxbXA1MLNuUS5EsorIE2HdAGRgvN2J34PMwhGmXqrXC2ADuRtIh4Wm8J9LvQYgMyuzWCoOl6jvG8mBYwHYpryr1eJVjNwpAmQoVkQ2iTAHPTtsMuWLUObu4ZIjeyImzAINrEWlkubcIqiFrA8AsjK2ikaLGDtT9cdm4Hj6xRFbrF8piWENAJCd9SpHWghV3ILBiRg4f50wkI4FMj84xAwAOD+Nby/zYZd9HKQuQvKEct4zAeimkkGrYC5sKPkrAFkmwRhrAm5oqVOaMPOhnjJgWRgLogPpACAbbCbWIg0KlazOzMAGqFeuYodILBKjg2HfBqIAZIOZydNKRtBc1kbg6DgzqlZxz9bErPAkALqdTEfKRKKAzb+3pijSBSDLB9luXTuASpYMjJqhburacR3gmCZ87QAqWcZqAUxMn8SEr90HqgpRlw9cZJIiClMnfQVBxDtEZ1GYKZGJjGH0fSg6UHZS1MDGzn6ZDpwI6aUOFAcyVseWW4k5cxSG9ntbe7jNzoNAhYgF0kkqh1MxqxpNMwtRAnK7D84gpMPA1Q1lhMDHLBceiimqnKXCPqO8G0hODCAYh4MoybiZT2YWqHTjUExpBVVWVGQ7wJwulQoBc1krkDEONweweYuLqqUUVo1nGnBisQ3ApU5UtcLKktaRGYiDHwS7gwOgyG44R6wsgEwY2wBkjFL5I2OtLCoI/xlZc/tOF3Aja2Dmq4rJk+JLA5Axas357tB8aCHSCSBMFEebqxi3oLSmWlkm5bgGIA5V8IF1uMJCuTLjRaf7AephUzDn4jMPNrdzrh1e87gzgfnBNWBQFgauTYzXvEiSBDZi/xXn4pCyuoPa6RhAlpEof6BYaHazBjqkGg6LJckCAFe1MFsBcAwgzJd1cdLLNOJ0H+thuSTEK7s6dtQWDsPvqU7axSWveX8gM2NVClIslB361Q/hugSuQ/wLPXesAEECmMo6MEQ1kZrYzAFUYJiOtfoUdTHFTeajptfzvcCFSSXZKC5WkznTd4qFMH/V+elmKD3gRMY6rsYrd7FGgnsLQFYfpD6tspAVJdr63EJDBIg13wl06SvTZWIbr/LCAlBpQk8kq4spbtfCGnAiY5yUTfVFK8vaBxx2U0mx0LuYYo29VhP20k51cWh/RKAuG6oOAnlHeCaWTypLIgwciedf6q0jN7MRPUOYbpA7CkBPnri31OF7ltTmomD0fC/yToGIPRxQefeFWa0Ma5AX9XoWeemxzoWciQvzAFQBBet0GyovDcbS3y+lKL93oGklgNV3eP9HINRUtHQhl/h+oNBx4PtdAAOZBr5Cs5RLALHmNwP/cMIkSgjACiLLk/Fx6FB9zcLONca5AETvSS8BUInKhwygTPPCAI60lFWGuliadiyGEhN2CyGLADQEKaQMzmFv+h+PtU2o4hmVJZS9QgnAYgCPteMPZZ4NwM6d3ADcAOxEoHP4xsANwE4EOodvDNwA7ESgc/jGwA3ATgQ6h/8HyzoPvtAasAgAAAAASUVORK5CYII="

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

export default StreamsIcons