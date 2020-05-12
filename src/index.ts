/**
 * Bind method to class instance.
 *
 * @param target
 * @param propertyKey
 * @param descriptor
 */
function bind<T extends Function>(target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
  if (!descriptor || (typeof descriptor.value !== 'function')) {
    throw new TypeError(`Decorator @bind can only decorate method, seems like property: ${propertyKey} is not a method`);
  }

  return {
    configurable: true,
    get(this: T): T {
      const bound =  descriptor.value.bind(this);

      Object.defineProperty(target, propertyKey, {
        configurable: true,
        enumerable: true,
        value: bound
      });

      return bound;
    }
  }
}

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

const { getProp } = testObject;

console.log(getProp());

export { bind };
