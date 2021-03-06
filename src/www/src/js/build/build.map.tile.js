/**
 * Prepare map of each tile for easier mapping.
 * @param {scope} scope 
 * @param {any} callback Will call when done.
 * @return {}
 */
function tileMap(scope, callback) {
    const tilesetsImageData = {
        Dungeon_A1: {
            "columns": 32,
            "imageheight": 384,
            "imagewidth": 512,
            "margin": 0,
            "name": "Dungeon_A1",
            "spacing": 0,
            "tilecount": 768,
            "tileheight": 16,
            "tilewidth": 16
        },
        Dungeon_A2: {
            "columns": 32,
            "imageheight": 384,
            "imagewidth": 512,
            "margin": 0,
            "name": "Dungeon_A2",
            "spacing": 0,
            "tilecount": 768,
            "tileheight": 16,
            "tilewidth": 16
        },
        Dungeon_A4: {
            "columns": 32,
            "imageheight": 480,
            "imagewidth": 512,
            "margin": 0,
            "name": "Dungeon_A4",
            "spacing": 0,
            "tilecount": 960,
            "tileheight": 16,
            "tilewidth": 16
        },
        Dungeon_A5: {
            "columns": 16,
            "imageheight": 512,
            "imagewidth": 256,
            "margin": 0,
            "name": "Dungeon_A5",
            "spacing": 0,
            "tilecount": 512,
            "tileheight": 16,
            "tilewidth": 16
        },
        Dungeon_B: {
            "columns": 32,
            "imageheight": 512,
            "imagewidth": 512,
            "margin": 0,
            "name": "Dungeon_B",
            "spacing": 0,
            "tilecount": 1024,
            "tileheight": 16,
            "tilewidth": 16
        },
        Dungeon_C: {
            "columns": 32,
            "imageheight": 512,
            "imagewidth": 512,
            "margin": 0,
            "name": "Dungeon_C",
            "spacing": 0,
            "tilecount": 1024,
            "tileheight": 16,
            "tilewidth": 16
        },
        Inside_A1: {
            "columns": 32,
            "imageheight": 384,
            "imagewidth": 512,
            "margin": 0,
            "name": "Inside_A1",
            "spacing": 0,
            "tilecount": 768,
            "tileheight": 16,
            "tilewidth": 16
        },
        Inside_A2: {
            "columns": 32,
            "imageheight": 384,
            "imagewidth": 512,
            "margin": 0,
            "name": "Inside_A2",
            "spacing": 0,
            "tilecount": 768,
            "tileheight": 16,
            "tilewidth": 16
        },
        Inside_A4: {
            "columns": 32,
            "imageheight": 480,
            "imagewidth": 512,
            "margin": 0,
            "name": "Inside_A4",
            "spacing": 0,
            "tilecount": 960,
            "tileheight": 16,
            "tilewidth": 16
        },
        Inside_A5: {
            "columns": 16,
            "imageheight": 512,
            "imagewidth": 256,
            "margin": 0,
            "name": "Inside_A5",
            "spacing": 0,
            "tilecount": 512,
            "tileheight": 16,
            "tilewidth": 16
        },
        Inside_B: {
            "columns": 32,
            "imageheight": 512,
            "imagewidth": 512,
            "margin": 0,
            "name": "Inside_B",
            "spacing": 0,
            "tilecount": 1024,
            "tileheight": 16,
            "tilewidth": 16
        },
        Inside_C: {
            "columns": 32,
            "imageheight": 512,
            "imagewidth": 512,
            "margin": 0,
            "name": "Inside_C",
            "spacing": 0,
            "tilecount": 1024,
            "tileheight": 16,
            "tilewidth": 16
        },
        Outside_A1: {
            "columns": 32,
            "imageheight": 384,
            "imagewidth": 512,
            "margin": 0,
            "name": "Outside_A1",
            "spacing": 0,
            "tilecount": 768,
            "tileheight": 16,
            "tilewidth": 16
        },
        Outside_A2: {
            "columns": 32,
            "imageheight": 384,
            "imagewidth": 512,
            "margin": 0,
            "name": "Outside_A2",
            "spacing": 0,
            "tilecount": 768,
            "tileheight": 16,
            "tilewidth": 16
        },
        Outside_A3: {
            "columns": 32,
            "imageheight": 256,
            "imagewidth": 512,
            "margin": 0,
            "name": "Outside_A3",
            "spacing": 0,
            "tilecount": 512,
            "tileheight": 16,
            "tilewidth": 16
        },
        Outside_A4: {
            "columns": 32,
            "imageheight": 480,
            "imagewidth": 512,
            "margin": 0,
            "name": "Outside_A4",
            "spacing": 0,
            "tilecount": 960,
            "tileheight": 16,
            "tilewidth": 16
        },
        Outside_A5: {
            "columns": 16,
            "imageheight": 512,
            "imagewidth": 256,
            "margin": 0,
            "name": "Outside_A5",
            "spacing": 0,
            "tilecount": 512,
            "tileheight": 16,
            "tilewidth": 16
        },
        Outside_B: {
            "columns": 32,
            "imageheight": 512,
            "imagewidth": 512,
            "margin": 0,
            "name": "Outside_B",
            "spacing": 0,
            "tilecount": 1024,
            "tileheight": 16,
            "tilewidth": 16
        },
        Outside_C: {
            "columns": 32,
            "imageheight": 512,
            "imagewidth": 512,
            "margin": 0,
            "name": "Outside_C",
            "spacing": 0,
            "tilecount": 1024,
            "tileheight": 16,
            "tilewidth": 16
        },
        World_A1: {
            "columns": 32,
            "imageheight": 384,
            "imagewidth": 512,
            "margin": 0,
            "name": "World_A1",
            "spacing": 0,
            "tilecount": 768,
            "tileheight": 16,
            "tilewidth": 16
        },
        World_A2: {
            "columns": 32,
            "imageheight": 384,
            "imagewidth": 512,
            "margin": 0,
            "name": "World_A2",
            "spacing": 0,
            "tilecount": 768,
            "tileheight": 16,
            "tilewidth": 16
        },
        World_B: {
            "columns": 32,
            "imageheight": 512,
            "imagewidth": 512,
            "margin": 0,
            "name": "World_B",
            "spacing": 0,
            "tilecount": 1024,
            "tileheight": 16,
            "tilewidth": 16
        }
    };

    /**
     * @type {MapTypeInf}
     */
    const beginInf = {
        "height": 20,
        "infinite": true,
        "layers": [{
                "chunks": [{
                        "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2,
                            0, 0, 0, 0, 0, 0, 33, 34, 35, 36, 33, 34, 35, 36, 33, 34,
                            0, 0, 0, 0, 0, 0, 65, 66, 67, 68, 65, 66, 67, 68, 65, 66,
                            0, 0, 0, 0, 0, 0, 97, 98, 99, 100, 97, 98, 99, 100, 97, 98,
                            0, 0, 0, 0, 0, 0, 129, 130, 131, 132, 129, 130, 131, 132, 129, 130,
                            0, 0, 0, 0, 0, 0, 161, 162, 163, 164, 161, 162, 163, 164, 161, 162,
                            0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2,
                            0, 0, 0, 0, 0, 0, 33, 34, 35, 36, 33, 34, 35, 36, 33, 34,
                            0, 0, 0, 0, 0, 0, 65, 66, 67, 68, 65, 66, 67, 68, 65, 66,
                            0, 0, 0, 0, 0, 0, 97, 98, 99, 100, 97, 98, 99, 100, 97, 98
                        ],
                        "height": 16,
                        "width": 16,
                        "x": -16,
                        "y": -16
                    },
                    {
                        "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 0, 0,
                            35, 36, 33, 34, 35, 36, 33, 34, 35, 36, 0, 0, 0, 0, 0, 0,
                            67, 68, 65, 66, 67, 68, 65, 66, 67, 68, 0, 0, 0, 0, 0, 0,
                            99, 100, 97, 98, 99, 100, 97, 98, 99, 100, 0, 0, 0, 0, 0, 0,
                            131, 132, 129, 130, 131, 132, 129, 130, 131, 132, 0, 0, 0, 0, 0, 0,
                            163, 164, 161, 162, 163, 164, 161, 162, 163, 164, 0, 0, 0, 0, 0, 0,
                            3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 0, 0,
                            35, 36, 33, 34, 35, 36, 33, 34, 35, 36, 0, 0, 0, 0, 0, 0,
                            67, 68, 65, 66, 67, 68, 65, 66, 67, 68, 0, 0, 0, 0, 0, 0,
                            99, 100, 97, 98, 99, 100, 97, 98, 99, 100, 0, 0, 0, 0, 0, 0
                        ],
                        "height": 16,
                        "width": 16,
                        "x": 0,
                        "y": -16
                    },
                    {
                        "data": [0, 0, 0, 0, 0, 0, 129, 130, 131, 132, 129, 130, 131, 132, 129, 130,
                            0, 0, 0, 0, 0, 0, 161, 162, 163, 164, 161, 162, 163, 164, 161, 162,
                            0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2,
                            0, 0, 0, 0, 0, 0, 33, 34, 35, 36, 33, 34, 35, 36, 33, 34,
                            0, 0, 0, 0, 0, 0, 65, 66, 67, 68, 65, 66, 67, 68, 65, 66,
                            0, 0, 0, 0, 0, 0, 97, 98, 99, 100, 97, 98, 99, 100, 97, 98,
                            0, 0, 0, 0, 0, 0, 129, 130, 131, 132, 129, 130, 131, 132, 129, 130,
                            0, 0, 0, 0, 0, 0, 161, 162, 163, 164, 161, 162, 163, 164, 161, 162,
                            0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 1, 2, 3, 132, 1, 2,
                            0, 0, 0, 0, 0, 0, 33, 34, 35, 36, 33, 34, 35, 164, 33, 34,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                        ],
                        "height": 16,
                        "width": 16,
                        "x": -16,
                        "y": 0
                    },
                    {
                        "data": [131, 132, 129, 130, 131, 132, 129, 130, 131, 132, 0, 0, 0, 0, 0, 0,
                            163, 164, 161, 162, 163, 164, 161, 162, 163, 164, 0, 0, 0, 0, 0, 0,
                            3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 0, 0,
                            35, 36, 33, 34, 35, 36, 33, 34, 35, 36, 0, 0, 0, 0, 0, 0,
                            67, 68, 65, 66, 67, 68, 65, 66, 67, 68, 0, 0, 0, 0, 0, 0,
                            99, 100, 97, 98, 99, 100, 97, 98, 99, 100, 0, 0, 0, 0, 0, 0,
                            131, 132, 129, 130, 131, 132, 129, 130, 131, 132, 0, 0, 0, 0, 0, 0,
                            163, 164, 161, 162, 163, 164, 161, 162, 163, 164, 0, 0, 0, 0, 0, 0,
                            3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0, 0, 0,
                            35, 36, 33, 34, 35, 36, 33, 34, 35, 36, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                        ],
                        "height": 16,
                        "width": 16,
                        "x": 0,
                        "y": 0
                    }
                ],
                "height": 32,
                "id": 1,
                "name": "Calque de Tuiles 1",
                "opacity": 1,
                "startx": -16,
                "starty": -16,
                "type": "tilelayer",
                "visible": true,
                "width": 32,
                "x": 0,
                "y": 0
            },
            {
                "chunks": [{
                        "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 1989, 1990, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 2021, 2022, 0, 0, 0, 0, 0, 0, 1989, 1990,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 2049, 2050, 0, 0, 0, 2021, 2022,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 2081, 2082, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 1989, 1990, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 2021, 2022, 0, 0, 0, 1989, 1990, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2021, 2022, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 1989, 1990, 1989, 1990, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 2021, 2022, 2021, 2022, 0, 0, 0, 0, 1989, 1990
                        ],
                        "height": 16,
                        "width": 16,
                        "x": -16,
                        "y": -16
                    },
                    {
                        "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 1423, 1424, 1423, 1424, 1423, 1424, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 1455, 1456, 1455, 1456, 1455, 1456, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 1483, 1484, 1485, 1486, 1487, 1488, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 1515, 1516, 1517, 1518, 1519, 1520, 0, 0, 0, 0, 0, 0,
                            1989, 1990, 0, 2049, 2050, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            2021, 2022, 0, 2081, 2082, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 1929, 1930, 0, 0, 1989, 1990, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 1, 1961, 1962, 4, 1, 2021, 2022, 4, 0, 0, 0, 0, 0, 0,
                            0, 0, 33, 34, 35, 36, 33, 34, 35, 36, 0, 0, 0, 0, 0, 0
                        ],
                        "height": 16,
                        "width": 16,
                        "x": 0,
                        "y": -16
                    },
                    {
                        "data": [0, 0, 0, 0, 0, 0, 1121, 1122, 1123, 1124, 1125, 1126, 0, 0, 2021, 2022,
                            0, 0, 0, 0, 0, 0, 1137, 2207, 2208, 1140, 1141, 1142, 2049, 2050, 0, 0,
                            0, 0, 0, 0, 0, 0, 1153, 2239, 2240, 1156, 1157, 1158, 2081, 2082, 0, 0,
                            0, 0, 0, 0, 0, 0, 1169, 1170, 1171, 1172, 1173, 1174, 77, 78, 79, 80,
                            0, 0, 0, 0, 0, 0, 1185, 1186, 1187, 1188, 1189, 1190, 109, 110, 111, 112,
                            0, 0, 0, 0, 0, 0, 1201, 1202, 1203, 1204, 1205, 1206, 141, 142, 143, 144,
                            0, 0, 0, 0, 0, 0, 1217, 1218, 1219, 1220, 1221, 1222, 109, 110, 111, 112,
                            0, 0, 0, 0, 0, 0, 1233, 1234, 1235, 1236, 1237, 1238, 141, 142, 143, 144,
                            0, 0, 0, 0, 0, 0, 1249, 1250, 1251, 1252, 1253, 1254, 109, 110, 111, 112,
                            0, 0, 0, 0, 0, 0, 1265, 1266, 1267, 1268, 1269, 1270, 141, 142, 143, 144,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                        ],
                        "height": 16,
                        "width": 16,
                        "x": -16,
                        "y": 0
                    },
                    {
                        "data": [0, 1865, 1866, 66, 67, 68, 2177, 2178, 2179, 2180, 0, 0, 0, 0, 0, 0,
                            0, 1897, 1898, 98, 99, 100, 2209, 2210, 2211, 2212, 0, 0, 0, 0, 0, 0,
                            1865, 1866, 129, 130, 2177, 2178, 2181, 2182, 2183, 2184, 0, 0, 0, 0, 0, 0,
                            1897, 1898, 161, 162, 2209, 2210, 2213, 2214, 2215, 2216, 0, 0, 0, 0, 0, 0,
                            0, 0, 1, 2, 2241, 2242, 2245, 2246, 2247, 2248, 0, 0, 0, 0, 0, 0,
                            0, 0, 33, 34, 2273, 2274, 2277, 2278, 2279, 2280, 0, 0, 0, 0, 0, 0,
                            0, 0, 1989, 1990, 2177, 2178, 2181, 2182, 2183, 2184, 0, 0, 0, 0, 0, 0,
                            0, 0, 2021, 2022, 2209, 2210, 2213, 2214, 2215, 2216, 0, 0, 0, 0, 0, 0,
                            0, 0, 129, 130, 2241, 2242, 2245, 2246, 2247, 2248, 0, 0, 0, 0, 0, 0,
                            0, 0, 161, 162, 2273, 2274, 2277, 2278, 2279, 2280, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                        ],
                        "height": 16,
                        "width": 16,
                        "x": 0,
                        "y": 0
                    }
                ],
                "height": 32,
                "id": 2,
                "name": "Calque de Tuiles 2",
                "opacity": 1,
                "startx": -16,
                "starty": -16,
                "type": "tilelayer",
                "visible": true,
                "width": 32,
                "x": 0,
                "y": 0
            },
            {
                "chunks": [{
                    "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 1937, 1938, 1939, 1940, 1941, 1942, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 1969, 1970, 1971, 1972, 1973, 1974, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 2001, 2002, 2003, 2004, 2005, 2006, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 2033, 2034, 2035, 2036, 2037, 2038, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 2065, 2066, 2067, 2068, 2069, 2070, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 2097, 2098, 2099, 2100, 2101, 2102, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 1993, 1994, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 2025, 2026, 0, 0, 0, 0, 0, 0, 0, 0
                    ],
                    "height": 16,
                    "width": 16,
                    "x": -16,
                    "y": -16
                }],
                "height": 32,
                "id": 3,
                "name": "Calque de Tuiles 3",
                "opacity": 1,
                "startx": -16,
                "starty": -16,
                "type": "tilelayer",
                "visible": true,
                "width": 16,
                "x": 0,
                "y": 0
            }
        ],
        "orientation": "orthogonal",
        "renderorder": "right-up",
        "tileheight": 16,
        "tilesets": [{
                "firstgid": 1,
                "source": "Outside_A2"
            },
            {
                "firstgid": 769,
                "source": "Outside_A5"
            },
            {
                "firstgid": 1281,
                "source": "Outside_B"
            }
        ],
        "tilewidth": 16,
        "width": 30
    };

    /**
     * @type {MapTypeLim}
     */
    const begin = {
        "height": 20,
        "infinite": false,
        "layers": [{
                "data": [769, 770, 771, 772, 769, 770, 771, 772, 769, 770, 771, 772, 769, 770, 771, 772, 769, 770, 771, 772,
                    801, 802, 803, 804, 801, 802, 803, 804, 801, 802, 803, 804, 801, 802, 803, 804, 801, 802, 803, 804,
                    833, 834, 835, 836, 833, 834, 835, 836, 833, 834, 835, 836, 833, 834, 835, 836, 833, 834, 835, 836,
                    865, 866, 867, 868, 865, 866, 867, 868, 865, 866, 867, 868, 865, 866, 867, 868, 865, 866, 867, 868,
                    897, 898, 899, 900, 897, 898, 899, 900, 897, 898, 899, 900, 897, 898, 899, 900, 897, 898, 899, 900,
                    929, 930, 931, 932, 929, 930, 931, 932, 929, 930, 931, 932, 929, 930, 931, 932, 929, 930, 931, 932,
                    769, 770, 771, 772, 769, 770, 771, 772, 769, 770, 771, 772, 769, 770, 771, 772, 769, 770, 771, 772,
                    801, 802, 803, 804, 801, 802, 803, 804, 801, 802, 803, 804, 801, 802, 803, 804, 801, 802, 803, 804,
                    833, 834, 835, 836, 833, 834, 835, 836, 833, 834, 835, 836, 833, 834, 835, 836, 833, 834, 835, 836,
                    865, 866, 867, 868, 865, 866, 867, 868, 865, 866, 867, 868, 865, 866, 867, 868, 865, 866, 867, 868,
                    897, 898, 899, 900, 897, 898, 899, 900, 897, 898, 899, 900, 897, 898, 899, 900, 897, 898, 899, 900,
                    929, 930, 931, 932, 929, 930, 931, 932, 929, 930, 931, 932, 929, 930, 931, 932, 929, 930, 931, 932,
                    769, 770, 771, 772, 769, 770, 771, 772, 769, 770, 771, 772, 769, 770, 771, 772, 769, 770, 771, 772,
                    801, 802, 803, 804, 801, 802, 803, 804, 801, 802, 803, 804, 801, 802, 803, 804, 801, 802, 803, 804,
                    833, 834, 835, 836, 833, 834, 835, 836, 833, 834, 835, 836, 833, 834, 835, 836, 833, 834, 835, 836,
                    865, 866, 867, 868, 865, 866, 867, 868, 865, 866, 867, 868, 865, 866, 867, 868, 865, 866, 867, 868,
                    897, 898, 899, 900, 897, 898, 899, 900, 897, 898, 899, 900, 897, 898, 899, 900, 897, 898, 899, 900,
                    929, 930, 931, 932, 929, 930, 931, 932, 929, 930, 931, 932, 929, 930, 931, 932, 929, 930, 931, 932,
                    769, 770, 771, 772, 769, 770, 771, 900, 769, 770, 771, 772, 769, 770, 771, 772, 769, 770, 771, 772,
                    801, 802, 803, 804, 801, 802, 803, 932, 801, 802, 401, 402, 402, 402, 803, 804, 801, 802, 803, 804
                ],
                "height": 20,
                "id": 1,
                "name": "Calque de Tuiles 1",
                "opacity": 1,
                "type": "tilelayer",
                "visible": true,
                "width": 20,
                "x": 0,
                "y": 0
            },
            {
                "data": [2193, 2194, 2195, 2196, 2197, 2198, 0, 0, 0, 0, 0, 0, 0, 0, 1679, 1680, 1679, 1680, 1679, 1680,
                    2225, 2226, 2227, 2228, 2229, 2230, 0, 0, 2245, 2246, 0, 0, 0, 0, 1711, 1712, 1711, 1712, 1711, 1712,
                    2257, 2258, 2259, 2260, 2261, 2262, 0, 0, 2277, 2278, 0, 0, 0, 0, 1739, 1740, 1741, 1742, 1743, 1744,
                    2289, 2290, 2291, 2292, 2293, 2294, 0, 0, 0, 0, 0, 0, 0, 0, 1771, 1772, 1773, 1774, 1775, 1776,
                    2321, 2322, 2323, 2324, 2325, 2326, 0, 0, 0, 0, 2245, 2246, 0, 2305, 2306, 0, 0, 0, 0, 0,
                    2353, 2354, 2355, 2356, 2357, 2358, 2245, 2246, 0, 0, 2277, 2278, 0, 2337, 2338, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 2277, 2278, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2185, 2186, 0, 0, 2245, 2246, 0,
                    2249, 2250, 2245, 2246, 0, 0, 0, 0, 0, 0, 0, 0, 769, 2217, 2218, 772, 769, 2277, 2278, 772,
                    2281, 2282, 2277, 2278, 0, 0, 0, 0, 2245, 2246, 0, 0, 801, 802, 803, 804, 801, 802, 803, 804,
                    2913, 2914, 2915, 2916, 2917, 2918, 0, 0, 2277, 2278, 0, 2121, 2122, 834, 835, 836, 2433, 2434, 2435, 2436,
                    2929, 2463, 2464, 2932, 2933, 2934, 2305, 2306, 0, 0, 0, 2153, 2154, 866, 867, 868, 2465, 2466, 2467, 2468,
                    2945, 2495, 2496, 2948, 2949, 2950, 2337, 2338, 0, 0, 2121, 2122, 897, 898, 2433, 2434, 2437, 2438, 2439, 2440,
                    2961, 2962, 2963, 2964, 2965, 2966, 845, 846, 847, 848, 2153, 2154, 929, 930, 2465, 2466, 2469, 2470, 2471, 2472,
                    2977, 2978, 2979, 2980, 2981, 2982, 877, 878, 879, 880, 0, 0, 769, 770, 2497, 2498, 2501, 2502, 2503, 2504,
                    2993, 2994, 2995, 2996, 2997, 2998, 909, 910, 911, 912, 0, 0, 801, 802, 2529, 2530, 2533, 2534, 2535, 2536,
                    3009, 3010, 3011, 3012, 3013, 3014, 877, 878, 879, 880, 0, 0, 2245, 2246, 2433, 2434, 2437, 2438, 2439, 2440,
                    3025, 3026, 3027, 3028, 3029, 3030, 909, 910, 911, 912, 0, 0, 2277, 2278, 2465, 2466, 2469, 2470, 2471, 2472,
                    3041, 3042, 3043, 3044, 3045, 3046, 877, 878, 879, 880, 0, 0, 897, 898, 2497, 2498, 2501, 2502, 2503, 2504,
                    3057, 3058, 3059, 3060, 3061, 3062, 909, 910, 911, 912, 0, 0, 929, 930, 2529, 2530, 2533, 2534, 2535, 2536
                ],
                "height": 20,
                "id": 2,
                "name": "Calque de Tuiles 2",
                "opacity": 1,
                "type": "tilelayer",
                "visible": true,
                "width": 20,
                "x": 0,
                "y": 0
            },
            {
                "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ],
                "height": 20,
                "id": 3,
                "name": "Calque de Tuiles 3",
                "opacity": 1,
                "type": "tilelayer",
                "visible": true,
                "width": 20,
                "x": 0,
                "y": 0
            }
        ],
        "nextlayerid": 4,
        "nextobjectid": 1,
        "orientation": "orthogonal",
        "renderorder": "right-up",
        "tileheight": 16,
        "tilesets": [{
                "firstgid": 1,
                "source": "Outside_A1"
            },
            {
                "firstgid": 769,
                "source": "Outside_A2"
            },
            {
                "firstgid": 1537,
                "source": "Outside_B"
            },
            {
                "firstgid": 2561,
                "source": "Outside_A5"
            }
        ],
        "tilewidth": 16,
        "width": 20
    };

    return callback({ names: tilesetsImageData, map: { begin: begin, beginInf: beginInf } });
}