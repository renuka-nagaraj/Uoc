import { RemovewhitespacesPipe } from './removewhitespaces.pipe';

describe('RemovewhitespacesPipe', () => {
  it('create an instance', () => {
    const pipe = new RemovewhitespacesPipe();
    expect(pipe).toBeTruthy();
  });
  it('call transform', () => {
    const pipe = new RemovewhitespacesPipe();
    pipe.transform('hello world');
  });
});
