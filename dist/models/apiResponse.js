"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIResponse {
    constructor(payload) {
        this.payload = payload;
        this.timestamp = new Date().toISOString();
    }
}
exports.default = APIResponse;
