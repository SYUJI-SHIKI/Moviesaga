"use client"

import Router from "next/router";

let isGoingBack = false;

Router.beforePopState(() => {
  isGoingBack = true;
  return true;
})

const originalPush = Router.push;
Router.push = function(...args) {
  isGoingBack = false;
  return originalPush.apply(this, args);
};

export function isNavigationBack() {
  return isGoingBack;
}

export default Router;