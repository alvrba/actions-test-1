// global
import { sql, DatabaseTransactionConnectionType as TrxHandler } from 'slonik';
import { Item } from "graasp";
import { Action } from './interfaces/actions';


/**
 * Database's first layer of abstraction for Items
 */
export class ActionService {
  // the 'safe' way to dynamically generate the columns names:
  private static allColumns = sql.join(
    [
      'id',
      'name',
      'description',
      'type',
      'path',
      'extra',
      'creator',
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
    ].map((c) =>
      !Array.isArray(c)
        ? sql.identifier([c])
        : sql.join(
            c.map((cwa) => sql.identifier([cwa])),
            sql` AS `,
          ),
    ),
    sql`, `,
  );

  private static allColumnsForJoins = sql.join(
    [
      [['item', 'id'], ['id']],
      [['item', 'name'], ['name']],
      [['item', 'description'], ['description']],
      [['item', 'type'], ['type']],
      [['item', 'path'], ['path']],
      [['item', 'extra'], ['extra']],
      [['item', 'creator'], ['creator']],
      [['item', 'created_at'], ['createdAt']],
      [['item', 'updated_at'], ['updatedAt']],
    ].map((c) =>
      sql.join(
        c.map((cwa) => sql.identifier(cwa)),
        sql` AS `,
      ),
    ),
    sql`, `,
  );

  async getAction(
    transactionHandler: TrxHandler,
  ): Promise<Action> {
    return transactionHandler
      .query<Action>(
        sql`
        SELECT *
        FROM action
      `,
      )
      .then(({ rows }) => rows[0] || null);
  }

  /*
  async create(transactionHandler: TrxHandler,): Promise<Action> {
    return transactionHandler
      .query<Action>(
        sql`
        INSERT INTO "action" (
            "memberId",
            "itemId",
            "memberType",
            "itemType",
            "actionType"
        )
        VALUES (
            '1c9ed3b7-7689-42eb-ad23-ba8961f13f9c',
            'e756c9d5-9bc5-4f54-a2e7-24a17afbdd45',
            'memtype',
            'itemtype',
            'actiontype'
        );
      `,
      )
      .then(({ rows }) => rows[0] || null);
  }
*/

  async create(action: Action, transactionHandler: TrxHandler,): Promise<Action> {
    return transactionHandler
      .query<Action>(
        sql`
        INSERT INTO "action" (
            "memberId",
            "memberType",
            "itemId",
            "itemType",
            "actionType"
        )
        VALUES (
            ${action.memberId},
            ${action.memberType},
            ${action.itemId},
            ${action.itemType},
            ${action.actionType}
        )
      `,
      )
      .then(({ rows }) => rows[0] || null);
  }

  async getActionsByActionType(itemId: string, transactionHandler: TrxHandler): Promise<Action> {
    return transactionHandler
      .query<Action>(
        sql`
        SELECT COUNT("id"), "actionType" FROM action
        WHERE "itemId" = ${itemId}
        GROUP BY "actionType"
      `,
      )
      .then(({ rows }) => rows[0] || null);
  }

  async getActionsByItem(itemId: string, transactionHandler: TrxHandler): Promise<Action> {
    return transactionHandler
      .query<Action>(
        sql`
        SELECT COUNT("id"), "actionType" FROM action
        WHERE "itemId" = ${itemId}
        GROUP BY "actionType"
      `,
      )
      .then(({ rows }) => rows[0] || null);
  }

}
