import { describe, expect, it, jest } from '@jest/globals';

jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Server Module', () => {
  it('should be able to import the server module without crashing', () => {
    const serverModule = require('./index');
    expect(serverModule).toBeDefined();
  });
});