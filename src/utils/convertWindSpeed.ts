export function convertWindSpeed(speedInMetersPerSecond: number): string {
    const kmPerHour = speedInMetersPerSecond * 3.6;
    return `${speedInMetersPerSecond.toFixed(0)}km/h`
}