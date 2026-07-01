/**
 * Numbers of decimal digits to round to
 */
const scale = 1;

/**
 * Calculate the score awarded when having a certain percentage on a list level.
 * The first entry in the list is worth 50 points and the last entry is worth 1.
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @param {Number} totalLevels Total number of levels on the list
 * @returns {Number}
 */
export function score(rank, percent, minPercent, totalLevels = 150) {
    if (rank > totalLevels || totalLevels <= 1) {
        return 0;
    }

    const maxScore = 50;
    const minScore = 1;
    const span = Math.max(totalLevels - 1, 1);
    const baseScore =
        minScore + ((totalLevels - rank) / span) * (maxScore - minScore);

    const progressRatio =
        (percent - (minPercent - 1)) / (100 - (minPercent - 1));
    let score = baseScore * Math.max(progressRatio, 0);

    score = Math.max(0, score);

    if (percent != 100) {
        return round(score - score / 3);
    }

    return Math.max(round(score), 0);
}

export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}
