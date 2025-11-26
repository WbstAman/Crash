const SponsorshipsIcon =

    ({ size = 20, className = "", alt = "thunder icon", ...props }) => {
        const numeric = typeof size === "number" ? size : Number(size) || 30;

        const dataUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAABY5JREFUeF7tm+1xFDEMhu0KIBVAOkgqACqAVACpAKiApAJCBZAKCBUQKoAOSAeECsS9h8xsvPKnfLcbRv5zDLPetR6/km1Z8c6aioBX9bbOzgAqRWAADaCSgLK7KdAAKgkou5sCDaCSgLK7KdAAKgkou5sCDaCSgLL76hRIRI+dcy+cc/h9wPb93vzfD+fctff+Rmnz0O6rAUhET51z7zaQ8Jtr1865S+/9p6EkOl+2OEAieuic+8iqazEDAM+XVuROADIUuOCRcw4udyMZyu76ld21BV54Fu9+lng3Jiao+RYhwHuP36FtKMCMGx7GRg6AN4V4HMPh9/+MaMH9oVr8DmnDAG5Ud+Gcey2M6pP3/jT+fyKC274aYsXfxeWZ8I3PidDwYQP8zYhvDwFYgAEXuzPjRARwADiySd+BCyNESE2c2NYBqQESEVbOs8SHb733B4IyYFRptW21JaXCX845xEOpvfXew3O6mwpgIs5MBzMzqqJPtzGb7Y0Ua1NujO9gUUGf7sVFC7DkigjYd9S5I/cN0GeKysTmZJ+WGdQCzM0uxnEab3grDGoZf/zsbHGomDBVLNQCLMUyCeDI1TcGOINRAVCMnbWzaAATW6B9ASyp6T648JX3/qQWWPycVoGlRaQnJvXakoq5WMSw1Uq12SS3DEALEPsrHJdS+6zZ7C6wjcnFaZzRD1uADVUgXkZEyN1hNZba2jfSKvXBYJUCAzEiyrlJ6xGrVxBSvM0d5WZ71J4PDwHISsThHLEmdmcxSBNRaQ/ZYk9LwgKnDsBTHeHC4IYBZIjIAQLkE84Fhu9IRyyA/q7IBYZ3izlBIdbiucvNBF9ojm7DY2BKJpxU3aoxlTUekBNMJlQnE4p/IhZ3n3dzrjBUgS0+N4mfUC1cvzU3eMVHxZ2AqbVlcYATkAD4siLNNTyrXAtLem41ACNFYvXEfYpda2pm9z70XZ0C7wO06RgNoHLGDKABVBJQdjcF/g8Ao1IQbKwfCXahQmtbohF+d3W6aGG6mAK5DASpsPjc3DJ+wPy22TMiYTGsXKNlAHsFyEpD+QcSDqkkbMv4p8/iXBxOKXurIRwCEGBy7sTg3necd3th7q30rQsgux+OWsH9UPAolncQUSpP2Aunth9UiLyfWIjJ99M4eyMMfOEw0KzcJoCJ8rXkvcKOL9FrQZ5578/jh9kr4nwkYOIirLr6tQog5+1whSkVBIn3CiuBF7ilMtaplD9iKewqKrIIkIjgqki/Y3sRN1F9hYqtWuWMfk6sxCKiVPUW4J1476HKZMsCrMgYS/e+AB1Xho6G0fM+sRKrcCGWzXhjECWApcoD6cat1KfH+FF9pGqx3M0dvputnUkCrLwAPxBqkxGY4fZrbLOQ02tnMC4HsDQzuCya9d/EP1ojuX8G940ZsRB3MLOWA5irONi+yABmYmCltKX7Xiwg0oq9BmHib0WOpwPh/SBW4lyb2Vl0YTxARKUCSmkRKVVDLQlSKsAshaq+RYQBYjHAopBq0qpWqthaEqDkMam/bwnjTKpvG8ZK1hRKZFPVVzj/InmwpiYWExFRLuQUq7eKAFmJkDn2d1Jsm7kx91nTflD8y6SMOLCBBrxijrEKIAMBvFA9MAWJj83+Vo37rCEeJv+sS1AfTisfWgqQqgEGX+RVC1uc55xcQMzLDRLQUfuy75U5W8Y2Oa/jOSgtpLSaam2aAcZBjYEe5eTOW6KeAqLeGAoVIY0lwpjcwSCGFzMuuUGoAbZYOAGJmDpakc3u1zL21LN7BTgdhF0qjZg+fkcIA3zRhL0n4mqozApfCteacDnk6JAYaIpXA4f871WLKXAXxizxTgOopG4ADaCSgLK7KdAAKgkou5sCDaCSgLK7KdAAKgkou5sCDaCSgLK7KVAJ8A9c5YFvjJ6tSwAAAABJRU5ErkJggg=="

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

export default SponsorshipsIcon