#!/bin/bash

APP_NAME="SELFIX"
APP_VERSION="1.1.1"

APP_PATH="dist/${APP_NAME}.app"
PKG_PATH="dist/${APP_NAME}-Installer-${APP_VERSION}.pkg"

INSTALL_LOCATION="/Applications"

# Create component package
pkgbuild \
  --root "$APP_PATH" \
  --identifier "pro.selfix.app" \
  --version "$APP_VERSION" \
  --install-location "$INSTALL_LOCATION" \
  "dist/${APP_NAME}.pkg"

# Wrap it with a distribution package
productbuild \
  --package "dist/${APP_NAME}.pkg" \
  "$PKG_PATH"
