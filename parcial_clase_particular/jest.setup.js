expect.extend({
    toEqualObject(received, expected) {
        const pass = received.equals(expected);
        if (pass) {
            return {
                message: () => `expected ${received} not to equal ${expected}`,
                pass: true,
            };
        } else {
            return {
                message: () => `expected ${received} to equal ${expected}`,
                pass: false,
            };
        }
    }
});