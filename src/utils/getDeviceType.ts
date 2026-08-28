import { DeviceType } from "../types/deviceType";

export function getDeviceType(): DeviceType {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/android/.test(userAgent)) {
        return "android";
    }

    if (/iphone|ipad|ipod/.test(userAgent)) {
        return "ios";
    }

    if (/windows/.test(userAgent)) {
        return "windows";
    }

    if (/macintosh|mac os x/.test(userAgent)) {
        return "macos";
    }

    if (/linux/.test(userAgent)) {
        return "linux";
    }

    return "unknown";
};