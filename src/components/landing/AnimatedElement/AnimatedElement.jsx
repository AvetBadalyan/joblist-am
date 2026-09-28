import useScrollAnimation from '../../../hooks/useScrollAnimation';

/**
 * Maps an animation type to the CSS keyframe name defined in index.css
 * and the initial (pre-animation) transform/opacity state.
 */
const ANIMATION_CONFIG = {
  'fade-in': {
    keyframe: 'fadeIn',
    hiddenStyle: { opacity: 0, transform: 'none' },
  },
  'slide-up': {
    keyframe: 'slideUp',
    hiddenStyle: { opacity: 0, transform: 'translateY(30px)' },
  },
  'slide-left': {
    keyframe: 'slideLeft',
    hiddenStyle: { opacity: 0, transform: 'translateX(30px)' },
  },
  'slide-right': {
    keyframe: 'slideRight',
    hiddenStyle: { opacity: 0, transform: 'translateX(-30px)' },
  },
  'scale-up': {
    keyframe: 'scaleUp',
    hiddenStyle: { opacity: 0, transform: 'scale(0.9)' },
  },
};

const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

/**
 * AnimatedElement
 *
 * A generic wrapper that triggers a CSS @keyframes animation when the element
 * scrolls into view (via Intersection Observer). All animation types map to
 * keyframes already declared in index.css.
 *
 * @param {object}  props
 * @param {React.ReactNode} props.children        - Content to animate.
 * @param {'fade-in'|'slide-up'|'slide-left'|'slide-right'|'scale-up'} props.animation
 * @param {number}  [props.delay=0]               - Delay before animation starts (ms).
 * @param {number}  [props.duration=600]          - Animation duration (ms).
 * @param {number}  [props.threshold=0.2]         - Intersection threshold (0–1).
 * @param {string}  [props.className]             - Extra CSS classes on the wrapper.
 * @param {string}  [props.as='div']              - HTML element to render as.
 */
function AnimatedElement({
  children,
  animation = 'fade-in',
  delay = 0,
  duration = 600,
  threshold = 0.2,
  className,
  as: Tag = 'div',
  ...rest
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce: true });

  const config = ANIMATION_CONFIG[animation] ?? ANIMATION_CONFIG['fade-in'];

  const style = isVisible
    ? {
        animation: `${config.keyframe} ${duration}ms ${EASING} ${delay}ms both`,
      }
    : {
        opacity: config.hiddenStyle.opacity,
        transform: config.hiddenStyle.transform,
      };

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default AnimatedElement;
