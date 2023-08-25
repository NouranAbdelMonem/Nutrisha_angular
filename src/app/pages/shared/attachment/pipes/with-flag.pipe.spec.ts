import { WithFlagPipe } from './with-flag.pipe';

describe('WithFlagPipe', () => {
  it('create an instance', () => {
    const pipe = new WithFlagPipe();
    expect(pipe).toBeTruthy();
  });
});
