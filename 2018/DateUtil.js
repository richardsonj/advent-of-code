export const millisToHours = (millis) => {
    return new Date(millis).toISOString().split("T")[1].replace('Z', '');
}