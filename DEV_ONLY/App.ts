import is from '../src';

console.log(is);

console.log(is.pascalCase('FooBar'));
console.log(is.camelCase('fooBar'));

// @ts-ignore
function foo(arg: string, bar?: string = 'baz') {
  console.log(is.arguments(arguments));
  console.log(is.not.array(arguments));
  console.log(is.arrayLike(arguments));
}

console.log(foo.length);

foo('bar');
