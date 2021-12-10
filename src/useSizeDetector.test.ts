import { useSizeDetector, useSizeDetectorArgs } from './useSizeDetector';
import { renderHook } from '@testing-library/react-hooks';

function getDefaultProps(): useSizeDetectorArgs {
  return {
    activeId: null,
    hasWindow: true,
    setForceRecompute: jest.fn(),
    updateActiveId: jest.fn()
  };
}

describe('useSizeDetector', () => {
  it('should return window size if no root is passed', () => {
    const { result } = renderHook((props) => useSizeDetector(props), {
      initialProps: getDefaultProps()
    });
    expect(result.current.targetSize).toBe(global.window.innerHeight);
    expect(result.current.useViewport).toBe(true);
  });

  it('should not use the viewport when no root is passed but window is not available', () => {
    const { result } = renderHook((props) => useSizeDetector(props), {
      initialProps: { ...getDefaultProps(), hasWindow: false }
    });
    expect(result.current.targetSize).toBe(1);
    expect(result.current.useViewport).toBe(false);
  });

  it('should work for horizontal scrolling as well', () => {
    const { result } = renderHook((props) => useSizeDetector(props), {
      initialProps: { ...getDefaultProps(), isHorizontal: true }
    });
    expect(result.current.targetSize).toBe(global.window.innerWidth);
  });
});
