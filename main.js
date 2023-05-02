class MapGenerator {
    constructor()
    {
        this.map = [];
    }
    generateMap(width, height, default_value)
    {
        let new_map = new Array();
        for (let i = 0; i < height; i++)
        {       
            new_map[i] = [];
            for (let j = 0; j < width; j++) {
                new_map[i][j] = [...default_value]; // can be Array
            }
        }
        return new_map
    }
    setMap(map)
    {
        this.map = map;
    }
    getMap()
    {
    	return this.map;
    }
    generateBiomaUsingCords(x, y, array_index_to_modify, tile_number, propagate=400)
    {
        let allowed_tiles = [{y: y, x: x}];
        
        let quantity_of_new_tiles = Math.floor(Math.random() * propagate) + propagate;

        console.log("Quantity of new tiles: " + quantity_of_new_tiles)
        let i = 0;
        while (i <= quantity_of_new_tiles) {
            let selected_number = Math.floor(Math.random() * (allowed_tiles.length - 1)) + 0;
            let selected_tile = allowed_tiles[selected_number];
            let direction = Math.floor(Math.random() * 4) + 1;

            let new_tile_x = null;
            let new_tile_y = null;

            if (direction == 1) {
                // RIGHT
                if (
                    typeof this.map[selected_tile.y+1]!= "undefined" &&
                    typeof this.map[selected_tile.y+1][selected_tile.x] != "undefined"
                )
                {
                    new_tile_x = selected_tile.x;
                    new_tile_y = selected_tile.y+1;
                }
            }
            else if (direction == 2) {
                // DOWN
                if (
                    typeof this.map[selected_tile.y] != "undefined" &&
                    typeof this.map[selected_tile.y][selected_tile.x+1] != "undefined"
                )
                {
                    new_tile_x = selected_tile.x+1;
                    new_tile_y = selected_tile.y;
                }
            }
            else if (direction == 3) {
                // LEFT
                if (
                    typeof this.map[selected_tile.y-1] != "undefined" &&
                    typeof this.map[selected_tile.y-1][selected_tile.x] != "undefined"
                )
                {
                    new_tile_x = selected_tile.x;
                    new_tile_y = selected_tile.y-1;
                }
            }
            else if (direction == 4) {
                // UP
                if (
                    typeof this.map[selected_tile.y] != "undefined" &&
                    typeof this.map[selected_tile.y][selected_tile.x-1] != "undefined"
                )
                {
                    new_tile_x = selected_tile.x-1;
                    new_tile_y = selected_tile.y;
                }
            }
            else {
                console.log("Error");
            }
            
            if (
                !(new_tile_x == null || new_tile_y == null || new_tile_x == undefined || new_tile_y == undefined) &&
                this.map[new_tile_y][new_tile_x][array_index_to_modify] != tile_number
            )
            {
                this.map[new_tile_y][new_tile_x][array_index_to_modify] = tile_number;
                allowed_tiles.push({y: new_tile_y, x: new_tile_x});
            }
            i++;
        }
        console.log(allowed_tiles)
    }
}
