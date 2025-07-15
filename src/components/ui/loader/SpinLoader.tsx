const SpinLoader = ({
  height = 20,
  width = 20,
  isDark = false,
  className = '',
  disabled = false,
}) => {
  return (
    <span
      style={{
        height: height,
        width: width,
      }}
      className={`block animate-spin border-2 border-black border-t-transparent rounded-full mr-1 ${disabled ? 'border-zgrey-800' : isDark ? 'border-black' : 'border-white'} ${className}`}
    ></span>
  )
}

export default SpinLoader
