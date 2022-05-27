class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class UnsupportedPlatform extends Error {
    constructor(message) {
        super(message);
        this.name = "UnsupportedPlatform";
    }
}