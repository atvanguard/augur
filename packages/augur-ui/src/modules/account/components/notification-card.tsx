import React from "react";
import classNames from "classnames";

import * as constants from "modules/common/constants";
import { ImmediateImportance } from "modules/common/icons";
import { PillLabel } from "modules/common/labels";

import Styles from "modules/account/components/notification.styles.less";

export interface NotificationProps {
  isImportant: boolean;
  isNew: boolean;
  title: string;
  children: React.StatelessComponent | Array<React.StatelessComponent>;
}

export const NotificationCard = (props: NotificationProps) => (
  <div
    className={classNames(Styles.NotificationCard, {
      [Styles.NewNotificationCard]: props.isNew,
    })}
  >
    <section>
      <div className={Styles.TitleBar}>
        {props.isImportant && (
          <span className={Styles.Importance}>
            {ImmediateImportance}
          </span>
        )}
        <span
          className={classNames(Styles.Title, {
            [Styles.TitleNew]: props.isNew,
          })}
        >
          {props.title}
        </span>
        {props.isNew && <PillLabel label={constants.NEW} />}
      </div>
      <div
        className={classNames(Styles.Message, {
          [Styles.MessageNew]: props.isNew,
        })}
      >
        {props.children}
      </div>
    </section>
  </div>
);
