const GiveawaysIcon =  ({ size = 20, className = "", alt = "thunder icon", ...props }) => {
    const numeric = typeof size === "number" ? size : Number(size) || 30;

    const dataUri="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAABW1JREFUeF7tm91RHEcQx3tGXPEIRGCIwFIGEIFEBIgIhB/kV6RX+cFSBMIRSI6AcwRIEUiO4M5PVMHdrvc3msZz3NcuDbqTq6fqauG0vdPzm39/zFIK4sNEIJis3VgcoFEEDtABGgkYzV2BDtBIwGjuCnSARgJGc1egAzQSMJq7Ah2gkYDR3BXoAI0EjOauQAdoJGA0dwU6QCMBo7kr0AEaCRjNXYEO0EjAaO4KdIBGAkZzV6ADNBIwmrsCfySAdV3vishjEflJRPZEZEtE+G47f24vZygifHR8FZF/ROSLiPwtIp9CCHy3svEgCqzrGiCA+jlf9zOoNgu9DQTAi0a/2Yw/RKS/CphmgBkWgFAV0GbBQkWA+ZQ/qIifVWEAR1Xc8ySEUKouwcvzcJ8qlvme5fkU8MfG/s8QwlmbnbqPexYCLJwuHWcBCksXU/rC4lEFIcZ1aZg1oc2Cjxqb466Lz2mBTcOeK4ONYO7XD63KG4B1XbObv2cH5uWkNpumyvqcVcV1GELg+6mRAST1hRDIi3ce+VknIvK0SBkpxLtuTFsnSoDnt8Kh7TO63Icy+ChcVMqmoeS9u6olK7jO4UsYE/IIAlVyVVW+vu9cmQAWKugC477vVbhcAXvz+yKwOc0MCmewIxWgPF3bq6xKIktzMZtIVFB8pnJu28UpwLci8qKt0Yru00KkhYcroFEvSiuHFhHN3bNydXk/IP9qiuBHBd92jQrwIlfQtnb/5/u0AJE3k4oXjbAm4bvMz1X9OzCp5HPbIgA+b9qS9x081EZ3WYPb4ZFrfytrPgshUIQmBgA/FJVq0Uowflsm3Az/tMMpY9WkCEmqNLmT/Kj9Y1u/phQJwIX5r6qqYYzxsMgHTMxIlSunADaBU8i6DnylMqcWpxzZf1q4LhH1rhES/aYAkP5p0TgJIbzLE7yPMe5XVcX9qV2gDcCJ6+vri16vp3DXDaSecNhkIoZrCkuabPzPQtoOofXplpA+BiA91LyFl6cDTgtpl5gkc2dnD+inmt/ptXBu3QZ9Hj7uhhAuct9Y+viriPw2Ho9fhBBIUV38PwHgoh6QvuiQXBFjROYJHJ8Yo2QlsovHufMnlNdtJPWFEM7rutazcukjItgbDAaytbU16Aiwr20MeXCWCinhKItGNZXyQn3qBIn5oK5rwoLnrNUYjUYHvV4PH780IAnVCf/yelBov1HhIMbYJQ0NtZGe18qkOEeBeQdnwVEFsrtJpWs2KIAUj5sUNMO/J6Shqqrqjgr87//KNbmQoxzhPCHvpoDs5C/Om0q8f2sHkT+Tf+VAPx6Njx5tPFozfqIV82UI4c2MmqkRxNpYYxf/vylQR85jNNWljG+qcIzxtKoq1Mpg4l/YucvLy93Nzc2LJgl3kX8XRy33DofD4d7Ozg6b/VJE3hQPYw1EWBLAjDP1snn7U7iLF5QYn1K1xuPxYc4j+kBAaR/Iz+Q+KjTtzsz3fss8eaB/Jy8TWfh0kA8B+MkH/5OvTStH90CuT2+0O/gyDbA0vrq6eryxsYGst6uqOosx3rzhBWxVVUcxRhpKHNKC02H+h79Vu4zm1ERLNnGuzVUZeORv+kIgd/oj1dKAz00mELVT19dJqaLlXX2Vm+2HJ3KHGbRH1fyXIZVv3VMod4WHK0sBqr+j0eh5jPFpBsnkVK3PTdmfOB/fYX3fxaR43c9fCssQbvXaap6TrQF+l1X+gJM4QOOmOUAHaCRgNHcFOkAjAaO5K9ABGgkYzV2BDtBIwGjuCnSARgJGc1egAzQSMJq7Ah2gkYDR3BXoAI0EjOauQAdoJGA0dwU6QCMBo7kr0AEaCRjNXYEO0EjAaO4KdIBGAkbzfwFFTvM14prpjgAAAABJRU5ErkJggg=="
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

export default GiveawaysIcon

