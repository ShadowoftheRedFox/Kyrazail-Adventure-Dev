class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class UnsupportedPlatformError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnsupportedPlatform";
    }
}