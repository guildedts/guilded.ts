import { RESTManager } from "../RESTManager";
import { BaseRouter } from "./BaseRouter";
import { ChannelRouter } from "./ChannelRouter";
import { DocRouter } from "./DocRouter";
import { ForumThreadRouter } from "./ForumThreadRouter";
import { GroupRouter } from "./GroupRouter";
import { ListItemRouter } from "./ListItemRouter";
import { MessageRouter } from "./MessageRouter";
import { ReactionRouter } from "./ReactionRouter";
import { ServerBanRouter } from "./server/ServerBanRouter";
import { ServerMemberRouter } from "./server/ServerMemberRouter";
import { ServerRoleRouter } from "./server/ServerRoleRouter";
import { WebhookRouter } from "./WebhookRouter";

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
    public readonly forumThreads: ForumThreadRouter;
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

	/** @param rest The REST API manager that owns this router. */
	public constructor(rest: RESTManager) {
		super(rest);
		this.channels = new ChannelRouter(rest);
		this.messages = new MessageRouter(rest);
		this.serverMembers = new ServerMemberRouter(rest);
		this.serverBans = new ServerBanRouter(rest);
        this.forumThreads = new ForumThreadRouter(rest);
		this.listItems = new ListItemRouter(rest);
		this.docs = new DocRouter(rest);
		this.reactions = new ReactionRouter(rest);
		this.serverRoles = new ServerRoleRouter(rest);
		this.groups = new GroupRouter(rest);
		this.webhooks = new WebhookRouter(rest);
	}
}
