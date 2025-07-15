# setup.py

from setuptools import setup

APP = ['selfix_gui.py']
DATA_FILES = [
    ('assets', [
        'assets/selfix_icon.png',
        'assets/selfix_icon.icns',
        'assets/selfix_icon.ico'
    ])
]
OPTIONS = {
    'argv_emulation': True,
    'iconfile': 'assets/selfix_icon.icns',
    'packages': ['tkinter', 'subprocess', 'os'],
}

setup(
    app=APP,
    name='SELFIX',
    data_files=DATA_FILES,
    options={'py2app': OPTIONS},
    setup_requires=['py2app'],
)
