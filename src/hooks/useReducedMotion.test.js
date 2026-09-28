/**
 * Tests for useReducedMotion hook.
 *
 * Requirements: 9.6, 13.6
 */
import { act, render } from "@testing-library/react";
import useReducedMotion from "./useReducedMotion";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Set up window.matchMedia with a controllable `matches` value.
 * Returns a reference to the mock so tests can fire the 'change' event.
 */
function setupMatchMedia(prefersReduced = false) {
  const listeners = [];

  const mql = {
    matches: prefersReduced,
    media: "(prefers-reduced-motion: reduce)",
    addEventListener: jest.fn((event, cb) => {
      if (event === "change") listeners.push(cb);
    }),
    removeEventListener: jest.fn((event, cb) => {
      const idx = listeners.indexOf(cb);
      if (idx !== -1) listeners.splice(idx, 1);
    }),
    // Legacy API (Safari < 14)
    addListener: jest.fn((cb) => listeners.push(cb)),
    removeListener: jest.fn((cb) => {
      const idx = listeners.indexOf(cb);
      if (idx !== -1) listeners.splice(idx, 1);
    }),
    // Helper to simulate the OS preference changing
    _fireChange(newValue) {
      this.matches = newValue;
      listeners.forEach((cb) => cb({ matches: newValue }));
    },
  };

  window.matchMedia = jest.fn().mockReturnValue(mql);
  return mql;
}

// ---------------------------------------------------------------------------
// Test harness component
// ---------------------------------------------------------------------------
let capturedValue;

function HookHarness() {
  capturedValue = useReducedMotion();
  return null;
}

function renderHook() {
  capturedValue = undefined;
  return render(<HookHarness />);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("useReducedMotion", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    capturedValue = undefined;
  });

  it("returns false when prefers-reduced-motion is NOT set", () => {
    setupMatchMedia(false);
    renderHook();
    expect(capturedValue).toBe(false);
  });

  it("returns true when prefers-reduced-motion IS set", () => {
    setupMatchMedia(true);
    renderHook();
    expect(capturedValue).toBe(true);
  });

  it("updates the returned value when the OS preference changes to reduced", () => {
    const mql = setupMatchMedia(false);
    renderHook();

    expect(capturedValue).toBe(false);

    act(() => {
      mql._fireChange(true);
    });

    expect(capturedValue).toBe(true);
  });

  it("updates the returned value when the OS preference changes back to no-preference", () => {
    const mql = setupMatchMedia(true);
    renderHook();

    expect(capturedValue).toBe(true);

    act(() => {
      mql._fireChange(false);
    });

    expect(capturedValue).toBe(false);
  });

  it("returns false when window.matchMedia is unavailable (SSR / old browsers)", () => {
    const saved = window.matchMedia;
    delete window.matchMedia;

    renderHook();

    expect(capturedValue).toBe(false);

    window.matchMedia = saved;
  });

  it("calls addEventListener to subscribe to changes", () => {
    const mql = setupMatchMedia(false);
    renderHook();

    expect(mql.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });

  it("calls removeEventListener on unmount (no memory leaks)", () => {
    const mql = setupMatchMedia(false);
    const { unmount } = renderHook();

    unmount();

    expect(mql.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });
});
