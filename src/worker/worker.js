// file: worker.js
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    // eslint-disable-next-line no-restricted-globals

    function getGradientColor(percent) {
        const canvas = new OffscreenCanvas(100, 1);
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(1, 'blue');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ctx.canvas.width, 1);
        const imgd = ctx.getImageData(0, 0, ctx.canvas.width, 1);
        const colors = imgd.data.slice(percent * 4, percent * 4 + 4);
        return `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]})`;
    }
    getGradientColor(40);  // rgba(152, 0, 104, 255 )

};
