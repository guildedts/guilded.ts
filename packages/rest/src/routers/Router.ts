import { CalendarEventRouter } from './calendarEvent/CalendarEventRouter';
import { CalendarEventRsvpRouter } from './calendarEvent/CalendarEventRsvpRouter';
import { ServerBanRouter } from './server/ServerBanRouter';
import { ServerMemberRouter } from './server/ServerMemberRouter';
import { ServerRoleRouter } from './server/ServerRoleRouter';
import { ServerRouter } from './server/ServerRouter';
import { BaseRouter } from './BaseRouter';
import { ChannelRouter } from './ChannelRouter';
import { DocRouter } from './DocRouter';
import { ForumTopicRouter } from './ForumTopicRouter';
import { GroupRouter } from './GroupRouter';
import { ListItemRouter } from './ListItemRouter';
import { MessageRouter } from './MessageRouter';
import { ReactionRouter } from './ReactionRouter';
import { WebhookRouter } from './WebhookRouter';
import { RESTManager } from '../RESTManager';

/**
 * The router for the Guilded REST API.
 * @example new Router(rest);
 */
export class Router extends BaseRouter {
	/** The channel router for the Guilded REST API. */
	readonly channels: ChannelRouter;
	/** The message router for the Guilded REST API. */
	readonly messages: MessageRouter;
	/** The server member router for the Guilded REST API. */
	readonly serverMembers: ServerMemberRouter;
	/** The server ban router for the Guilded REST API. */
	readonly serverBans: ServerBanRouter;
	/** The forum topic router for the Guilded REST API. */
	readonly forumTopics: ForumTopicRouter;
	/** The list item router for the Guilded REST API. */
	readonly listItems: ListItemRouter;
	/** The doc router for the Guilded REST API. */
	readonly docs: DocRouter;
	/** The reaction router for the Guilded REST API. */
	readonly reactions: ReactionRouter;
	/** The server role router for the Guilded REST API. */
	readonly serverRoles: ServerRoleRouter;
	/** The group router for the Guilded REST API. */
	readonly groups: GroupRouter;
	/** The webhook router for the Guilded REST API. */
	readonly webhooks: WebhookRouter;
	/** The server router for the Guilded REST API. */
	readonly servers: ServerRouter;
	/** The calendar event router for the Guilded REST API. */
	readonly calendarEvents: CalendarEventRouter;
	/** The calendar event RSVP router for the Guilded REST API. */
	readonly calendarEventRsvps: CalendarEventRsvpRouter;

	/** @param rest The REST API manager that owns this router. */
	constructor(rest: RESTManager) {
		super(rest);
		this.channels = new ChannelRouter(rest);
		this.messages = new MessageRouter(rest);
		this.serverMembers = new ServerMemberRouter(rest);
		this.serverBans = new ServerBanRouter(rest);
		this.forumTopics = new ForumTopicRouter(rest);
		this.listItems = new ListItemRouter(rest);
		this.docs = new DocRouter(rest);
		this.reactions = new ReactionRouter(rest);
		this.serverRoles = new ServerRoleRouter(rest);
		this.groups = new GroupRouter(rest);
		this.webhooks = new WebhookRouter(rest);
		this.servers = new ServerRouter(rest);
		this.calendarEvents = new CalendarEventRouter(rest);
		this.calendarEventRsvps = new CalendarEventRsvpRouter(rest);
	}
}
