/**
 * @description test demo
 * @author 泽华
 */

function sum(a, b) {
    return a + b;

}

test('test demo 1', () => {
    const res = sum(10, 20);
    expect(res).toBe(30);


});