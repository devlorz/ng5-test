import { DefaultPipe } from './default.pipe';

describe('DefaultPipe', () => {
  let pipe: DefaultPipe;

  beforeEach(() => {
    pipe = new DefaultPipe();
  });

  it('provide no value returns fallback', () => {
    expect(pipe.transform('', 'http://test-image.com')).toBe(
      'http://test-image.com'
    );
  });
});
