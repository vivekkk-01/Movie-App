export const getPoster = (posters = []) => {
    if (!posters.length || posters.length < 0) return null;
    return posters[0];
};