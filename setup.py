from setuptools import setup

APP = ['selfix_gui.py']
OPTIONS = {
    'iconfile': 'assets/selfix_icon.icns',
    'argv_emulation': True,
    'packages': [],
}

setup(
    app=APP,
    options={'py2app': OPTIONS},
    setup_requires=['py2app'],
)
