from setuptools import setup, find_packages

with open('README.md', 'r', encoding='utf-8') as f:
    long_description = f.read()

setup(
    name='course-scheduler',
    version='0.1.0',
    description='A Python-based course scheduling simulator with interactive CLI',
    long_description=long_description,
    long_description_content_type='text/markdown',
    author='Course Scheduler Team',
    url='https://github.com/example/course-scheduler',
    package_dir={'': 'src'},
    packages=find_packages(where='src'),
    install_requires=[
        'pyyaml>=6.0',
        'rich>=13.0.0',
    ],
    python_requires='>=3.8',
    entry_points={
        'console_scripts': [
            'course-scheduler=course_scheduler.cli.main:main',
        ],
    },
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Education',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
        'Programming Language :: Python :: 3.10',
        'Programming Language :: Python :: 3.11',
    ],
)
