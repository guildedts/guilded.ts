import { WSEvents } from 'guilded-api-typings';
export declare const handleWSData: <WSEvent extends keyof WSEvents = keyof WSEvents>(
	type: WSEvent,
	data: WSEvents[WSEvent],
) => void;
//# sourceMappingURL=Websocket.d.ts.map
