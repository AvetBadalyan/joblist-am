/**
 * Tests for useScrollAnimation hook.
 *
 * Strategy: we render the hook inside a real component (via React.createElement)
 * so that React wires `ref` to an actual DOM element. This is the only way to
 * make useEffect observe a non-null ref.current before firing.
 */
import { act, render } from "@testing-library/react";
import useScrollAnimation from "./useScrollAnimation";

// ---------------------------------------------------------------------------
// IntersectionObserver mock
// ---------------------------------------------------------------------------

function setupMockIO() {
  class MockIntersectionObserver {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      this.disconnected = false;
      this.observing = [];
      window._ioInstance = this;
    }

    observe(element) {
      this.observing.push(element);
    }
    disconnect() {
      this.disconnected = true;
    }
    unobserve(el) {
      this.observing = this.observing.filter((e) => e !== el);
    }

    triggerEntry(isIntersecting) {
      this.callback([{ isIntersecting, target: this.observing[0] }], this);
    }
  }

  window.IntersectionObserver = MockIntersectionObserver;
  window._ioInstance = null;
}

// ---------------------------------------------------------------------------
// matchMedia mock (drives useReducedMotion)
// ---------------------------------------------------------------------------

function mockMatchMedia(prefersReducedMotion) {
  window.matchMedia = jest.fn().mockReturnValue({
    matches: prefersReducedMotion,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
}

// ---------------------------------------------------------------------------
// Test harness component
//
// Renders the hook and exposes its return value on a ref so tests can read it
// after each render without needing renderHook.
// ---------------------------------------------------------------------------

function HookHarness({ options = {}, returnRef }) {
  const hookResult = useScrollAnimation(options);
  returnRef.current = hookResult;
  return <div ref={hookResult.ref} data-testid="target" />;
}

/**
 * Render the hook attached to a real DOM element.
 *
 * @param {object} options - options forwarded to useScrollAnimation
 * @returns {{ getResult, rerender, container }}
 */
function renderWithDOM(options = {}) {
  const returnRef = { current: null };

  const { rerender, container } = render(
    <HookHarness options={options} returnRef={returnRef} />,
  );

  const getResult = () => returnRef.current;

  const rerenderWith = (newOptions = options) =>
    rerender(<HookHarness options={newOptions} returnRef={returnRef} />);

  return { getResult, rerender: rerenderWith, container };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("useScrollAnimation", () => {
  beforeEach(() => {
    mockMatchMedia(false);
    setupMockIO();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    delete window._ioInstance;
  });

  // -------------------------------------------------------------------------
  // Initial state
  // -------------------------------------------------------------------------

  it("returns isVisible=false and hasAnimated=false initially", () => {
    const { getResult } = renderWithDOM();

    expect(getResult().isVisible).toBe(false);
    expect(getResult().hasAnimated).toBe(false);
  });

  it("returns a ref object", () => {
    const { getResult } = renderWithDOM();
    expect(getResult().ref).toHaveProperty("current");
  });

  it("creates an IntersectionObserver once the element is mounted", () => {
    renderWithDOM();
    expect(window._ioInstance).not.toBeNull();
  });

  // -------------------------------------------------------------------------
  // Visibility transitions
  // -------------------------------------------------------------------------

  it("sets isVisible=true and hasAnimated=true when element enters the viewport", () => {
    const { getResult } = renderWithDOM();

    act(() => {
      window._ioInstance.triggerEntry(true);
    });

    expect(getResult().isVisible).toBe(true);
    expect(getResult().hasAnimated).toBe(true);
  });

  // -------------------------------------------------------------------------
  // triggerOnce behaviour
  // -------------------------------------------------------------------------

  it("disconnects observer after first trigger when triggerOnce=true (default)", () => {
    const { getResult } = renderWithDOM({ triggerOnce: true });

    act(() => {
      window._ioInstance.triggerEntry(true);
    });

    expect(getResult().isVisible).toBe(true);
    expect(window._ioInstance.disconnected).toBe(true);
  });

  it("does NOT disconnect observer when triggerOnce=false", () => {
    renderWithDOM({ triggerOnce: false });

    act(() => {
      window._ioInstance.triggerEntry(true);
    });

    expect(window._ioInstance.disconnected).toBe(false);
  });

  it("resets isVisible=false on scroll-out when triggerOnce=false", () => {
    const { getResult } = renderWithDOM({ triggerOnce: false });

    act(() => {
      window._ioInstance.triggerEntry(true);
    });
    expect(getResult().isVisible).toBe(true);

    act(() => {
      window._ioInstance.triggerEntry(false);
    });
    expect(getResult().isVisible).toBe(false);
    expect(getResult().hasAnimated).toBe(true); // stays true once set
  });

  it("keeps isVisible=true after scroll-out when triggerOnce=true", () => {
    const { getResult } = renderWithDOM();

    act(() => {
      window._ioInstance.triggerEntry(true);
    }); // triggers + disconnects
    act(() => {
      window._ioInstance.triggerEntry(false);
    }); // direct call, observer disconnected

    expect(getResult().isVisible).toBe(true);
  });

  // -------------------------------------------------------------------------
  // Options forwarding
  // -------------------------------------------------------------------------

  it("passes the provided threshold to IntersectionObserver", () => {
    renderWithDOM({ threshold: 0.5 });

    expect(window._ioInstance.options.threshold).toBe(0.5);
  });

  it("passes the provided rootMargin to IntersectionObserver", () => {
    renderWithDOM({ rootMargin: "-50px" });

    expect(window._ioInstance.options.rootMargin).toBe("-50px");
  });

  // -------------------------------------------------------------------------
  // prefers-reduced-motion
  // -------------------------------------------------------------------------

  it("returns isVisible=true and hasAnimated=true immediately when reduced-motion is set", () => {
    mockMatchMedia(true);
    const { getResult } = renderWithDOM();

    expect(getResult().isVisible).toBe(true);
    expect(getResult().hasAnimated).toBe(true);
  });

  it("does NOT create an IntersectionObserver when reduced-motion is set", () => {
    mockMatchMedia(true);
    renderWithDOM();

    expect(window._ioInstance).toBeNull();
  });

  // -------------------------------------------------------------------------
  // IntersectionObserver unavailable (older browsers)
  // -------------------------------------------------------------------------

  it("falls back to isVisible=true when IntersectionObserver is not available", () => {
    const saved = window.IntersectionObserver;
    delete window.IntersectionObserver;

    const { getResult } = renderWithDOM();

    expect(getResult().isVisible).toBe(true);
    expect(getResult().hasAnimated).toBe(true);

    window.IntersectionObserver = saved;
  });
});
