/** @format */

export function convertKelvinToCelsius(tepKelvin: number): number {
    const tempIncelsius = tepKelvin - 273.15;
    return Math.floor(tempIncelsius);
}
