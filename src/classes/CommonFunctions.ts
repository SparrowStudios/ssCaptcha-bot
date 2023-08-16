import { randomBytes } from "crypto";
import { writeFileSync } from "fs";
import { DbCaptcha } from "../mysql/models/DbCaptcha";
import Captcha from "./Captcha";

export function formatString(str: string, ...replacements: any[]): string {
    return str.replace(/{(\d+)}/g, function(match, number) { return typeof replacements[number] != 'undefined' ? replacements[number] : match; });
}

export function UTCDate(): string {
    const dateNow: Date = new Date(Date.now());
    const formatStr: string = "{0}-{1}-{2}";
    return formatString(formatStr,
        dateNow.getUTCMonth().toString().padStart(2, "0"),
        dateNow.getUTCDate().toString().padStart(2, "0"),
        dateNow.getUTCFullYear().toString()
    );
}

export function UTCTime(): string {
    const dateNow: Date = new Date(Date.now());
    const formatStr: string = "{0}:{1}:{2}";
    return formatString(formatStr,
        dateNow.getUTCHours().toString().padStart(2, "0"),
        dateNow.getUTCMinutes().toString().padStart(2, "0"),
        dateNow.getUTCMilliseconds().toString().padStart(2, "0")
    );
}

export function UTCTimestamp(): string {
    const formatStr: string = "{0} {1} UTC";
    return formatString(formatStr,
        UTCDate(),
        UTCTime()
    );
}

export function randomCaptchaText(): string {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array(6)
        .join()
        .split(',')
        .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
        .join('');
}

export function shuffleArray(arr: number[]): number[] {
    let i: number = arr.length,
			temp: number,
			randomIndex: number;
    // While there remain elements to shuffle...
    while (0 !== i) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * i);
        i -= 1;
        // And swap it with the current element.
        temp = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = temp;
    }
    return arr;
}

export async function generateCaptcha(): Promise<DbCaptcha> {
    const captcha = new DbCaptcha();
    const image = new Captcha();

    captcha.image = image.buffer;
    captcha.dataUrl = image.dataURL;
    captcha.value = image.value;

    return captcha;
}