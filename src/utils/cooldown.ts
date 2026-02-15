export default function cooldown(map: any, key: any, time: any) {
    const now = Date.now();
    if (map.has(key) && map.get(key) > now) return false;
    map.set(key, now + time);
    return true;
}
