#!/bin/bash

set -e

APP_NAME="SELFIX"
APP_VERSION="1.1.1"
APP_ID="pro.selfix.app"

APP_PATH="dist/${APP_NAME}.app"
SIGNED_APP="dist/${APP_NAME}-signed.app"
PKG_UNSIGNED="dist/${APP_NAME}.pkg"
PKG_SIGNED="dist/${APP_NAME}-signed.pkg"
PKG_FINAL="dist/${APP_NAME}-Installer-${APP_VERSION}.pkg"

INSTALL_PATH="/Applications"

echo "➡️ Signing .app..."
codesign --deep --force --verbose \
  --options runtime \
  --sign "$DEV_ID_APP" \
  "$APP_PATH"

echo "📦 Building component .pkg..."
pkgbuild \
  --root "$APP_PATH" \
  --identifier "$APP_ID" \
  --version "$APP_VERSION" \
  --install-location "$INSTALL_PATH" \
  "$PKG_UNSIGNED"

echo "🔏 Signing .pkg..."
productsign --sign "$DEV_ID_INSTALLER" "$PKG_UNSIGNED" "$PKG_SIGNED"

echo "☁️ Submitting to Apple for notarization..."
xcrun altool --notarize-app \
  --primary-bundle-id "$APP_ID" \
  --username "$AC_USERNAME" \
  --password "$AC_PASSWORD" \
  --file "$PKG_SIGNED"

echo "⏳ Waiting ~2 mins for notarization result... (check manually if needed)"
echo "📎 You may run stapler later:"
echo "xcrun stapler staple $PKG_SIGNED"

mv "$PKG_SIGNED" "$PKG_FINAL"
