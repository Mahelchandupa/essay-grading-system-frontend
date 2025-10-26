export function snakeToTitleCase(snakeCaseText) {
    if (typeof snakeCaseText !== 'string') return '';
    
    return snakeCaseText
        .toLowerCase()
        .split('_')
        .filter(word => word.length > 0) // Remove empty strings
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}