module.exports = function cooldown(map, key, time) {
    const now = Date.now();
    if (map.has(key) && map.get(key) > now) return false;
    map.set(key, now + time);
    return true;
}
