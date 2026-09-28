import { act, render } from "@testing-library/react";
import useStatsCounter from "./useStatsCounter";

// ---------------------------------------------------------------------------
// Global stubs required for jsdom
// ---------------------------------------------------------------------------

/**
 * jsdom doesn't implement matchMedia. We provide a stub that returns
 * no-preference (matches: false) by default. Individual describe blocks
 * can override it to simulate prefers-reduced-motion.
 */
function setupMatchMedia(prefersReduced = false) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn((query) => ({
      matches:
        prefersReduced && query === "(prefers-reduced-motion: reduce)"
          ? true
          : false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })),
  });
}

/**
 * No-op: jest.useFakeTimers() with modern sinon-based fake timers already fakes
 * requestAnimationFrame / cancelAnimationFrame internally. We do NOT spy-replace
 * them manually, which would cause ID-type mismatches on cleanup.
 */
function setupRafWithFakeTimers() {
  // Modern Jest (CRA 5 uses @sinonjs/fake-timers) automatically fakes rAF.
  // Nothing extra needed here — calling jest.useFakeTimers() is sufficient.
}

// ---------------------------------------------------------------------------
// IntersectionObserver mock
// ---------------------------------------------------------------------------
let observerCallback = null;
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

function setupIntersectionObserver() {
  observerCallback = null;
  mockObserve.mockClear();
  mockDisconnect.mockClear();

  global.IntersectionObserver = jest.fn((cb) => {
    observerCallback = cb;
    return { observe: mockObserve, disconnect: mockDisconnect };
  });
}

// Helper: simulate element entering/leaving the viewport
function triggerIntersection(isIntersecting = true) {
  if (observerCallback) {
    act(() => {
      observerCallback([{ isIntersecting }]);
    });
  }
}

// ---------------------------------------------------------------------------
// Helper: test component that renders a real div and exposes hook state
// ---------------------------------------------------------------------------
let capturedResult = {};

function TestComponent({ end, duration, startOnVisible }) {
  const result = useStatsCounter({
    end,
    ...(duration !== undefined && { duration }),
    ...(startOnVisible !== undefined && { startOnVisible }),
  });
  // Expose latest result to the outer test scope
  capturedResult = result;
  return <div ref={result.ref} data-testid="counter-el" />;
}

function renderCounter(props) {
  capturedResult = {};
  return render(<TestComponent {...props} />);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("useStatsCounter – initial state", () => {
  beforeEach(() => {
    setupMatchMedia(false);
    setupIntersectionObserver();
  });

  it("returns the correct shape: ref, count, isAnimating", () => {
    renderCounter({ end: 500 });

    expect(capturedResult.ref).toBeDefined();
    expect(typeof capturedResult.count).toBe("number");
    expect(typeof capturedResult.isAnimating).toBe("boolean");
  });

  it("starts with count = 0 before intersection fires", () => {
    renderCounter({ end: 500 });

    expect(capturedResult.count).toBe(0);
    expect(capturedResult.isAnimating).toBe(false);
  });
});

describe("useStatsCounter – startOnVisible: false", () => {
  beforeEach(() => {
    setupMatchMedia(false);
    setupIntersectionObserver();
    jest.useFakeTimers();
    setupRafWithFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("begins animating immediately without waiting for the viewport", () => {
    renderCounter({ end: 100, duration: 1000, startOnVisible: false });

    act(() => {
      jest.advanceTimersByTime(1100);
    });

    expect(capturedResult.count).toBe(100);
    expect(capturedResult.isAnimating).toBe(false);
  });
});

describe("useStatsCounter – startOnVisible: true (default)", () => {
  beforeEach(() => {
    setupMatchMedia(false);
    setupIntersectionObserver();
    jest.useFakeTimers();
    setupRafWithFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("does NOT start animating before element enters the viewport", () => {
    renderCounter({ end: 300, duration: 2000 });

    expect(capturedResult.count).toBe(0);
    expect(capturedResult.isAnimating).toBe(false);
  });

  it("registers an IntersectionObserver on the rendered element", () => {
    renderCounter({ end: 300 });

    expect(mockObserve).toHaveBeenCalledTimes(1);
  });

  it("starts animating when element enters the viewport", () => {
    renderCounter({ end: 200, duration: 1000 });

    expect(capturedResult.count).toBe(0);

    triggerIntersection(true);

    act(() => {
      jest.advanceTimersByTime(1100);
    });

    expect(capturedResult.count).toBe(200);
    expect(capturedResult.isAnimating).toBe(false);
  });

  it("does not start when isIntersecting is false", () => {
    renderCounter({ end: 200, duration: 1000 });

    triggerIntersection(false);

    act(() => {
      jest.advanceTimersByTime(1100);
    });

    expect(capturedResult.count).toBe(0);
  });

  it("only triggers once (triggerOnce behavior)", () => {
    renderCounter({ end: 50, duration: 500 });

    // First intersection – animation runs to completion
    triggerIntersection(true);

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(capturedResult.count).toBe(50);

    // A second intersection should NOT reset/restart the counter
    triggerIntersection(true);

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(capturedResult.count).toBe(50);
  });

  it("disconnects the observer after the first intersection", () => {
    renderCounter({ end: 100 });

    triggerIntersection(true);

    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });
});

describe("useStatsCounter – prefers-reduced-motion", () => {
  beforeEach(() => {
    setupMatchMedia(true); // simulate prefers-reduced-motion: reduce
    setupIntersectionObserver();
  });

  it("jumps directly to end value without animating", () => {
    renderCounter({ end: 999, startOnVisible: false });

    expect(capturedResult.count).toBe(999);
    expect(capturedResult.isAnimating).toBe(false);
  });
});

describe("useStatsCounter – default duration", () => {
  beforeEach(() => {
    setupMatchMedia(false);
    setupIntersectionObserver();
    jest.useFakeTimers();
    setupRafWithFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("completes within the default 2000ms duration", () => {
    renderCounter({ end: 1000, startOnVisible: false });

    act(() => {
      jest.advanceTimersByTime(2100);
    });

    expect(capturedResult.count).toBe(1000);
  });
});
