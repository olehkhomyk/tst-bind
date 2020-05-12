import { bind } from '../index';

/**
 * @jest-environment jsdom
 */
class TestClass {
  public prop: string;

  constructor(value: string) {
    this.prop = value;
  }

  @bind
  public getProp(): string {
    return this.prop;
  }
}

const testValue = 'test value';
const testObject = new TestClass(testValue);

test('class initialized with values', () => {
  expect(testObject).toBeTruthy();
  expect(testObject.prop).toBe(testValue);
});

test('@bind decorator bind method to class instance', () => {
  const { getProp } = testObject;

  expect(getProp()).toBe(testObject.prop);
  expect(getProp()).toBe(testValue);
});

