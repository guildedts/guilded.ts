import { RESTManager } from '../RESTManager';
import { BaseRouter } from './BaseRouter';
import { ChannelRouter } from './ChannelRouter';
import { DocRouter } from './DocRouter';
import { TopicRouter } from './TopicRouter';
import { GroupRouter } from './GroupRouter';
import { ListItemRouter } from './ListItemRouter';
import { MessageRouter } from './MessageRouter';
import { ReactionRouter } from './ReactionRouter';
import { ServerBanRouter } from './server/ServerBanRouter';
import { ServerMemberRouter } from './server/ServerMemberRouter';
import { ServerRoleRouter } from './server/ServerRoleRouter';
import { ServerRouter } from './server/ServerRouter';
import { WebhookRouter } from './WebhookRouter';
import { CalendarEventRouter } from './CalendarEventRouter';

/** The router for the Guilded REST API. */
export class Router extends BaseRouter {
	/** The channel router for the Guilded REST API. */
	public readonly channels: ChannelRouter;
	/** The message router for the Guilded REST API. */
	public readonly messages: MessageRouter;
	/** The server member router for the Guilded REST API. */
	public readonly serverMembers: ServerMemberRouter;
	/** The server ban router for the Guilded REST API. */
	public readonly serverBans: ServerBanRouter;
	/** The forum thread router for the Guilded REST API. */
	public readonly topics: TopicRouter;
	/** The list item router for the Guilded REST API. */
	public readonly listItems: ListItemRouter;
	/** The doc router for the Guilded REST API. */
	public readonly docs: DocRouter;
	/** The reaction router for the Guilded REST API. */
	public readonly reactions: ReactionRouter;
	/** The server role router for the Guilded REST API. */
	public readonly serverRoles: ServerRoleRouter;
	/** The group router for the Guilded REST API. */
	public readonly groups: GroupRouter;
	/** The webhook router for the Guilded REST API. */
	public readonly webhooks: WebhookRouter;
	/** The server router for the Guilded REST API. */
	public readonly servers: ServerRouter;
	/** The calendar event router for the Guilded REST API. */
	public readonly calendarEvents: CalendarEventRouter;

	/** @param rest The REST API manager that owns this router. */
	public constructor(rest: RESTManager) {
		super(rest);
		this.channels = new ChannelRouter(rest);
		this.messages = new MessageRouter(rest);
		this.serverMembers = new ServerMemberRouter(rest);
		this.serverBans = new ServerBanRouter(rest);
		this.topics = new TopicRouter(rest);
		this.listItems = new ListItemRouter(rest);
		this.docs = new DocRouter(rest);
		this.reactions = new ReactionRouter(rest);
		this.serverRoles = new ServerRoleRouter(rest);
		this.groups = new GroupRouter(rest);
		this.webhooks = new WebhookRouter(rest);
		this.servers = new ServerRouter(rest);
		this.calendarEvents = new CalendarEventRouter(rest);
	}
}
