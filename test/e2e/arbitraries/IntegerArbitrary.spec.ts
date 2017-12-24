import * as assert from 'power-assert';
import * as sc from '../../../src/check/simple-check'

const seed = Date.now();
describe(`IntegerArbitrary (seed: ${seed})`, () => {
    describe('integer', () => {
        it('Should generate integer within the range', () => {
            const out = sc.check(sc.property(sc.integer(-42, -10), (v: number) => -42 <= v && v <= -10), {seed: seed});
            assert.ok(!out.failed, 'Should have succeeded');
        });
        it('Should shrink integer with strictly negative range', () => {
            const out = sc.check(sc.property(sc.integer(-1000, -10), (v: number) => v > -100), {seed: seed});
            assert.ok(out.failed, 'Should have failed');
            assert.deepEqual(out.counterexample, [-100], 'Should shrink to counterexample -100');
        });
    });
    describe('nat', () => {
        it('Should generate natural numbers', () => {
            const out = sc.check(sc.property(sc.nat(), (v: number) => v >= 0), {seed: seed});
            assert.ok(!out.failed, 'Should have succeeded');
        });
        it('Should shrink natural number', () => {
            const out = sc.check(sc.property(sc.nat(), (v: number) => v < 100), {seed: seed});
            assert.ok(out.failed, 'Should have failed');
            assert.deepEqual(out.counterexample, [100], 'Should shrink to counterexample 100');
        });
    });
});