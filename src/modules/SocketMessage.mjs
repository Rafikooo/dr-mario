export class SocketMessage {
    static TYPE_CONNECTION = 'CONNECTION';
    static TYPE_GAME_START = 'GAME_START';
    static TYPE_PLAYER_KEY = 'PLAYER_KEY';
    static TYPE_PLAYER_KEY_UPDATE = 'PLAYER_KEY_UPDATE';
    static TYPE_TICK = 'TICK';
    static TYPE_PILL = 'PILL';
    static TYPE_OUT_OF_PILLS = 'OUT_OF_PILLS';
    static TYPE_CREATE_ROOM = 'CREATE_ROOM';
    static TYPE_ROOM_CREATED = 'ROOM_CREATED';
    static TYPE_JOINED_ROOM = 'JOINED_ROOM';
    static TYPE_ALERT = 'ALERT';
    static TYPE_POINTS_UPDATED = 'POINTS_UPDATED';
    static TYPE_GAME_OVER = 'GAME_OVER';
    static TYPE_PING = 'PING;'

    type;
    data;
    client;

    constructor(type, data, client) {
        this.type = type;
        this.client = client;
        this.data = data;
    }

    static send(type, data, client) {
        return JSON.stringify({
            'type': type,
            'data': data,
            'client': client,
        })
    }

    static read(message) {
        const data = JSON.parse(message);

        return new this(data.type, data.data, data.client);
    }
}
