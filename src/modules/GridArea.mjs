import {Square} from "./Square.mjs";
import {Color} from "./Color.mjs";
import {Pill} from "./objects/Pill.mjs";
import {EntityTypes} from "./EntityTypes.mjs";
import {Options} from "./Options.mjs";

export class GridArea {
    x;
    y;
    rows;
    tileWidth;
    tileHeight;
    columns;
    tiles;
    pill;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.rows = Options.GRID_ROWS;
        this.tileWidth = Options.TILE_SIZE;
        this.tileHeight = Options.TILE_SIZE;
        this.tickUpdate = Options.TILE_UPDATE;
        this.columns = Options.GRID_COLUMNS;
        this.tiles = [];
        this.pill = null;

        this.addPill();
    }

    update(canvas) {
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].update(canvas);
        }

        if (this.pill) {
            this.pill.update(canvas);
        }
    }

    render(canvas) {
        let x = this.x;
        let y = this.y;

        for (let i = 0; i < (this.rows * this.columns); i++) {
            if (i % this.columns === 0) {
                x = this.x;
                y += this.tileHeight;
            }

            let square = new Square(x, y, this.tileWidth, this.tileHeight);
            x += this.tileWidth;

            canvas.squareBorder(square);
        }

        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].render(canvas);
        }
    }

    isTileAtPos(xPos, yPos, tile) {
        return this.tiles.filter(object => {
            return (
                tile.pill !== object.pill &&
                xPos === object.xPos && yPos === object.yPos
            )
        }).length > 0;
    }

    placeBlock() {
        this.pill.placeBlock();
    }

    tileGrounded() {
        this.pill.tileGrounded();
    }

    movePillRight() {
        this.pill.moveRight();
    }

    movePillLeft() {
        this.pill.moveLeft();
    }

    rotatePillRight() {
        this.pill.rotateRight();
    }

    rotatePillLeft() {
        this.pill.rotateLeft();
    }

    addPill() {
        if (this.pill) {
            this.pill.tiles = [];
        }

        this.pill = new Pill(this, this.tileWidth);
    }
}
