import React from 'react';
import {createNode} from 'spritejs';
import {now, rIC} from './ReactDOMFrameScheduling';
import {getClosestInstanceFromNode} from './ReactDOMComponentTree';

const ReactFiberReconciler = require('react-reconciler');

const UPDATE_SIGNAL = {};

function applyAttrs(target, props) {
  const events = {};
  props = Object.assign({}, props);

  Object.keys(props).forEach((key) => {
    if(key.startsWith('on')) {
      const eventName = key.slice(2).toLowerCase();
      events[eventName] = props[key];
      delete props[key];
    }
  });

  if(typeof target === 'string') target = createNode(target, props);
  else target.attr(props);

  Object.keys(events).forEach((key) => {
    target.__originalEvents = target.__originalEvents || {};
    target.off(key, target.__originalEvents[key]);
    target.on(key, events[key]);
    target.__originalEvents[key] = events[key];
  });

  return target;
}

const SpriteRender = ReactFiberReconciler({
  appendInitialChild(parent, child) {
    parent.appendChild(child);
  },

  createInstance(type, props, scene) {
    return applyAttrs(type, props);
  },

  createTextInstance(text, rootContainerInstance, scene) {
    // Noop
  },

  finalizeInitialChildren(domElement, type, props) {
    return false;
  },

  getPublicInstance(instance) {
    return instance;
  },

  prepareForCommit() {
    // Noop
  },

  prepareUpdate(domElement, type, oldProps, newProps) {
    return UPDATE_SIGNAL;
  },

  resetAfterCommit() {
    // Noop
  },

  resetTextContent(domElement) {
    // Noop
  },

  shouldDeprioritizeSubtree(type, props) {
    return false;
  },

  getRootHostContext() {
    return {};
  },

  getChildHostContext() {
    return {};
  },

  rIC,

  shouldSetTextContent(type, props) {
    return false;
  },

  // cancelDeferredCallback: ReactScheduler.cancelDeferredCallback,
  now,

  // The Sprite renderer is secondary to the React DOM renderer.
  isPrimaryRenderer: false,

  supportsMutation: true,

  // useSyncScheduling: true,

  appendChild(parent, child) {
    parent.appendChild(child);
  },

  appendChildToContainer(parent, child) {
    parent.appendChild(child);
  },

  insertBefore(parent, child, refchild) {
    parent.insertBefore(child, refchild);
  },

  insertInContainerBefore(parent, child, refchild) {
    parent.insertBefore(child, refchild);
  },

  removeChild(parent, child) {
    parent.removeChild(child);
  },

  removeChildFromContainer(parent, child) {
    parent.removeChild(child);
  },

  commitTextUpdate(textInstance, oldText, newText) {
    // Noop
  },

  commitMount(instance, type, newProps) {
    // Noop
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    applyAttrs(instance, newProps);
  },
});

SpriteRender.injectIntoDevTools({
  findFiberByHostInstance: getClosestInstanceFromNode,
  bundleType: process.env.NODE_ENV !== 'production' ? 1 : 0,
  version: React.version || 16,
  rendererPackageName: 'sprite-react',
  getInspectorDataForViewTag: (...args) => {
    console.log(args); // eslint-disable-line no-console
  },
});

export {SpriteRender};
