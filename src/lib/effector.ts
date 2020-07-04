import * as React from 'react';
import { Event } from 'effector';

const START = `☄️/start-event`;
type Params = Record<string, string>;

export function getStart<T>(component: T): undefined | Event<Params> {
  return component[START];
}

export function assignStart(
  component: React.Component | React.FC,
  event: Event<Params>,
) {
  component[START] = event;
}
