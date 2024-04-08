// next.config.js
module.exports = {
    async rewrites() {
        return [
            {
                source: '/categorias/001',
                destination: '/categorias/gama-enocean',
            },
        ];
    },
};
