/**
 * WaveDivider
 *
 * An SVG-based decorative wave that visually separates sections.
 * Purely decorative — hidden from assistive technology via aria-hidden.
 *
 * @param {'top'|'bottom'} props.position - Whether to pin the wave to the top
 *   or bottom edge of the nearest positioned ancestor.
 * @param {string}  [props.color='#ffffff'] - Fill color of the wave shape.
 * @param {boolean} [props.flip=false]      - Horizontally mirror the wave path
 *   for visual variety between sections.
 */
function WaveDivider({ position = 'bottom', color = '#ffffff', flip = false }) {
  const style = {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: 'auto',
    lineHeight: 0, // remove inline-block gap
    ...(position === 'top' ? { top: 0 } : { bottom: 0 }),
    // Flip the SVG horizontally when requested
    ...(flip ? { transform: 'scaleX(-1)' } : {}),
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
        fill={color}
      />
    </svg>
  );
}

export default WaveDivider;
