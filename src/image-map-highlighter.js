'use strict';

class ImageMapHighlighter {
    /**
     * @param {HTMLImageElement} element
     */
    constructor(element) {
        this.element = element;
    }

    /**
     * Convert the image into a canvas that animates when you hover over parts
     * of it.
     */
    init() {
        // Get the HTML map element associated with the given image element.
        let map = this._getAssociatedMap(this.element);

        // Create a shiny new canvas with the same dimensions as the image.
        let canvas = this._createCanvasFor(this.element);

        // Create a container element and move the image element as well as
        // our shiny new canvas into it.
        let container = this._createContainerFor(this.element);
        this.element.parentNode.insertBefore(container, this.element);
        container.appendChild(this.element);
        container.insertBefore(canvas, this.element);

        // Animate the canvas accordingly every time we hover over an image
        // mapping.
        map.addEventListener('mouseover', event => {
            let coords = event.target.coords.split(',').map(coord => parseInt(coord));
            let shape = event.target.shape;

            this._drawHighlight(canvas, shape, coords);
        });

        // Clear the canvas when we hover off a mapping.
        map.addEventListener('mouseout', event => {
            this._clearHighlights(canvas);
        });
    }

    /**
     * Create and return a new HTML div element.
     *
     * @param {HTMLImageElement} element
     * @returns {HTMLDivElement}
     * @private
     */
    _createContainerFor(element) {
        let container = document.createElement('div');
        container.classList.add('map-container');
        container.style.backgroundImage = `url(${element.src})`;
        container.style.height = `${element.height}px`;
        container.style.width = `${element.width}px`;
        return container;
    }

    /**
     * Create and return a new HTML canvas element.
     *
     * @param {HTMLImageElement} element
     * @returns {HTMLCanvasElement}
     * @private
     */
    _createCanvasFor(element) {
        let canvas = document.createElement('canvas');
        canvas.height = element.height;
        canvas.width = element.width;
        return canvas;
    }

    /**
     * Return the HTML map element referenced by the given HTML image element.
     *
     * @param {HTMLImageElement} element
     * @returns {HTMLMapElement}
     * @private
     */
    _getAssociatedMap(element) {
        if (!element.useMap) {
            throw new Error('The "useMap" attribute for this image element has not been set.');
        }

        let map = document.querySelector(`map[name=${element.useMap.substr(1)}]`);
        if (map === null) {
            throw new Error(`The requested map "${element.useMap}" could not be found.`);
        }

        return map;
    }

    _clearHighlights(canvas) {
        let context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * Draw the map area co-ordinates onto the provided HTM canvas element.
     *
     * @param {HTMLCanvasElement} canvas
     * @param {String} shape
     * @param {Array} coords
     * @private
     */
    _drawHighlight(canvas, shape, coords) {
        let context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        switch (shape) {
            case 'circle':
                context.arc(coords[0], coords[1], coords[2], 0, Math.PI * 2, false);
                break;
            case 'poly':
                context.moveTo(coords[0], coords[1]);
                for (let i = 2; i < coords.length; i += 2) {
                    context.lineTo(coords[i], coords[i + 1]);
                }
                break;
            case 'rect':
                context.rect(coords[0], coords[1], coords[2] - coords[0], coords[3] - coords[1]);
                break;
            default:
        }
        context.closePath();
        context.stroke();
    }
}

module.exports = ImageMapHighlighter;
