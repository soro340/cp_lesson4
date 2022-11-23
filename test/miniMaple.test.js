import {MiniMaple} from "../src/miniMaple";

test('expression validation fail', () => {
    expect(MiniMaple.validateExpr('4*x / 5*x^2')).toBeFalsy();
});

test('expression validation pass', () => {
    expect(MiniMaple.validateExpr('4*x + 5*x^2')).toBeTruthy();
});

test('variable validation fail - starts with number', () => {
    expect(MiniMaple.validateVar('7x')).toBeFalsy();
});

test('variable validation fail - bad char', () => {
    expect(MiniMaple.validateVar('x+')).toBeFalsy();
});

test('variable validation pass', () => {
    expect(MiniMaple.validateVar('Ax_1_2')).toBeTruthy();
});

test('variable validation pass (starts with _)', () => {
    expect(MiniMaple.validateVar('_')).toBeTruthy();
});

test('diff simple', () => {
    expect(MiniMaple.diff('4*x^3', 'x')).toBe('12*x^2');
});

test('diff const', () => {
    expect(MiniMaple.diff('4*x^3', 'y')).toBe('0');
});

test('diff', () => {
    expect(MiniMaple.diff('4*x^3-x^2', 'x')).toBe('12*x^2 - 2*x');
});

test('diff complicated', () => {
    expect(MiniMaple.diff('4*x^3 - 5*4*x^2 + -7*x^3', 'x')).toBe('12*x^2 - 40*x - 21*x^2');
});

test('diff complicated with const', () => {
    expect(MiniMaple.diff('4*x^3 - 5*y^3*x^2 - 7*y', 'y')).toBe('-15*x^2*y^2 - 7');
});

test('diff complicated variable', () => {
    expect(MiniMaple.diff('4*x1_1^3*x2 - x2^2', 'x1_1')).toBe('12*x2*x1_1^2');
});

test('diff omit 1', () => {
    expect(MiniMaple.diff('x*y + x', 'x')).toBe('y + 1');
});

test('diff exp 0', () => {
    expect(MiniMaple.diff('x^0 + x', 'x')).toBe('1');
});