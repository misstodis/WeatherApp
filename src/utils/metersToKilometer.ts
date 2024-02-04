export function metersToKilometer(visibilityInMeters: number): string {
    const toKm = visibilityInMeters / 100;
    return `${toKm.toFixed(0)}km`;
}