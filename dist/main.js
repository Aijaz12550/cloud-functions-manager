"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: "../../../test.env" });
let args = process.argv;
let file_path = args[2];
console.log("hello world", args);
fs.readFile(file_path, "utf-8", async (error, data) => {
    if (error) {
        console.log("error", error);
        return;
    }
    let jsonData = JSON.parse(data);
    try {
        let func = await Promise.resolve(`${jsonData.path}`).then(s => __importStar(require(s)));
        let event = jsonData.event;
        console.log("handler", func.handler);
        await func.handler(event, {}, () => "");
    }
    catch (error) {
        console.log("error", error);
        return;
    }
});
